import React from "react";
import { SideBar } from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { Header } from "./Header/Header";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <Stack direction="row" spacing={2} width={"100%"}>
        <SideBar />
        <Outlet />
      </Stack>
    </>
  );
};
