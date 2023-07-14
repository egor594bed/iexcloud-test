import React, { useEffect, useRef, useState } from "react";
import apiService from "../services/api-service";

interface ISymbolStockData {
  symbol: string;
  companyName: string;
  currency: string;
  latestPrice: number;
}

export const useFetchSymbol = (symbol: string) => {
  const [symbolStockData, setSymbolStockData] = useState<ISymbolStockData>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function getStockBySymbolHandler() {
    apiService
      .getStockBySymbol(symbol)
      .then((data) => setSymbolStockData(data));

    timeout.current = setTimeout(() => {
      getStockBySymbolHandler();
    }, 2000);
  }

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      getStockBySymbolHandler();
    }, 500);

    return () => clearTimeout(firstTimeout);
  }, []);

  useEffect(() => {
    if (symbolStockData) {
      clearTimeout(timeout.current);
    }

    return () => clearTimeout(timeout.current);
  }, [symbolStockData]);

  return { symbolStockData };
};
