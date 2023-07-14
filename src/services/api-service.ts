import { API_KEY } from "../config";

export type symbolData = {
  date: string;
  isEnabled: boolean;
  name: string;
  symbol: string;
};

class ApiService {
  async getSymbols(): Promise<symbolData[]> {
    return await fetch(
      `https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=${API_KEY}`
    ).then((data) => data.json());
  }

  async getStockBySymbol(symbol: string) {
    return await fetch(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
    ).then((data) => data.json());
  }
}

export default new ApiService();
