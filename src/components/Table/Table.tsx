import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  changePage,
  rotateActiveList,
  swapToFavorite,
} from "../../redux/slices/symbols";
import { TableItem } from "./TableItem";
import {
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import FavoriteStorageService from "../../services/favorite-storage-service";
import { symbolData } from "../../services/api-service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DraggableStyle } from "../../types/dnd/DraggableStyle";
import { reorder } from "../../utils/reorder";

export const TableComponent = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const locationPath = location.pathname;
  let activeSymbols: { symbol: string }[] | symbolData[] = useSelector(
    (state: RootState) => state.symbolsSlice.activeSymbolsList
  );

  useEffect(() => {
    dispatch(changePage(page));
  }, [page]);

  useEffect(() => {
    if (locationPath === "/favorite") {
      dispatch(swapToFavorite());
    } else {
      dispatch(changePage(page));
    }
  }, [location.pathname]);

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      activeSymbols,
      result.source.index,
      result.destination.index
    );

    dispatch(rotateActiveList(items as symbolData[]));
    if (locationPath === "/favorite") {
      FavoriteStorageService.saveRotatedSymbols(items as { symbol: string }[]);
    }
  }

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggableStyle
  ) => ({
    display: isDragging ? "table" : "",

    background: isDragging ? "white" : "transperent",

    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    padding: 8,
  });

  return (
    <Stack spacing={2} width="100%">
      <DragDropContext onDragEnd={onDragEnd}>
        <TableContainer component={Paper} style={{ marginTop: 30 }}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Table
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
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
                <TableBody>
                  {activeSymbols.map((elem, i) => {
                    return (
                      <Draggable
                        key={elem.symbol}
                        draggableId={elem.symbol}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            //@ts-ignore
                            style={getItemStyle(
                              snapshot.isDragging,
                              //@ts-ignore
                              provided.draggableProps.style
                            )}
                          >
                            <TableItem
                              symbol={elem.symbol}
                              index={
                                locationPath === "/table"
                                  ? page * 10 - 10 + i + 1
                                  : i + 1
                              }
                            />
                          </TableRow>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </TableBody>
              </Table>
            )}
          </Droppable>
        </TableContainer>
      </DragDropContext>
      {locationPath === "/table" && (
        <ButtonGroup disableElevation variant="contained">
          <Button
            variant="outlined"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Назад
          </Button>
          <Button variant="contained" onClick={() => setPage(page + 1)}>
            Вперед
          </Button>
        </ButtonGroup>
      )}
    </Stack>
  );
};
