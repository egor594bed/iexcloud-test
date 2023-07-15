import React, { memo } from "react";
import { TableCell, TableRow, TableHead } from "@mui/material";

export const TableHeadComponent = memo(() => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell align="center" width={"5%"}>
            №
          </TableCell>
          <TableCell align="right" width={"10%"}>
            Символ
          </TableCell>
          <TableCell align="left" width={"55%"}>
            Наименование компании
          </TableCell>
          <TableCell align="right" width={"15%"}>
            Валюта
          </TableCell>
          <TableCell align="right" width={"15%"}>
            Цена
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
});
