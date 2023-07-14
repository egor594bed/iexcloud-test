import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "primary.dark",
      }}
    >
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                navigate("/table", { state: { title: "Таблица" } })
              }
            >
              <ListItemIcon>
                <TableRowsRoundedIcon htmlColor="white"></TableRowsRoundedIcon>
              </ListItemIcon>
              <ListItemText primary="Таблица" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                navigate("/favorite", { state: { title: "Избранное" } })
              }
            >
              <ListItemIcon>
                <FavoriteRoundedIcon htmlColor="white"></FavoriteRoundedIcon>
              </ListItemIcon>
              <ListItemText primary="Избранное" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};
