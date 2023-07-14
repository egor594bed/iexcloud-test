import React, { FC, useState } from "react";
import { Button, Skeleton, TableCell, TableRow } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useFetchSymbol } from "../../hooks/fetchSymbol.hook";
import FavoriteStorageService from "../../services/favorite-storage-service";

interface ITableItem {
  symbol: string;
  index: number;
}

export const TableItem: FC<ITableItem> = ({ symbol, index }) => {
  const { symbolStockData } = useFetchSymbol(symbol);
  const [isFavorite, setIsFavorite] = useState(() =>
    FavoriteStorageService.isFavorite(symbol)
  );

  function toggleFavoriteHandler() {
    FavoriteStorageService.toggleFavoriteSymbol(symbol);
    setIsFavorite(!isFavorite);
  }

  return (
    <>
      <TableCell align="center">{index}</TableCell>
      <TableCell align="right">{symbol}</TableCell>
      <TableCell align="left">
        {!symbolStockData?.companyName ? (
          <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
        ) : (
          symbolStockData?.companyName
        )}
      </TableCell>
      <TableCell align="right">
        {!symbolStockData?.currency ? (
          <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
        ) : (
          symbolStockData?.currency
        )}
      </TableCell>
      <TableCell align="right">
        {!symbolStockData?.latestPrice ? (
          <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
        ) : (
          symbolStockData?.latestPrice
        )}
      </TableCell>
      <TableCell align="right">
        <Button onClick={toggleFavoriteHandler}>
          {isFavorite ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
        </Button>
      </TableCell>
    </>
  );
};
