import React, { useState } from "react";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorder } from "../../utils/reorder";
import FavoriteStorageService from "../../services/favorite-storage-service";
import { DraggableStyle } from "../../types/dnd/DraggableStyle";
import { TableItem } from "../Table/TableItem";
import { TableHeadComponent } from "../Table/TableHeadComponent";

export const FavoriteTable = () => {
  const [acviveFavoriteSymbols, setAcviveFavoriteSymbols] = useState<
    { symbol: string }[]
  >(FavoriteStorageService.getFavoriteSymbolsInObj());

  function onDragEnd(result: any) {
    if (!result.destination || !acviveFavoriteSymbols) {
      return;
    }

    const items = reorder(
      acviveFavoriteSymbols,
      result.source.index,
      result.destination.index
    );

    setAcviveFavoriteSymbols([...items]);
    FavoriteStorageService.saveRotatedSymbols(items as { symbol: string }[]);
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
                <TableHeadComponent />
                <TableBody>
                  {acviveFavoriteSymbols.map((elem, i) => {
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
                            <TableItem symbol={elem.symbol} index={i + 1} />
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
    </Stack>
  );
};
