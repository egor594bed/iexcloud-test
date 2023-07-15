import { useEffect } from "react";
import { TableComponent } from "./components/Table/Table";
import { useDispatch } from "react-redux";
import { getSymbols } from "./redux/slices/symbols";
import { AppDispatch } from "./redux/store";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { FavoriteTable } from "./components/Favorite/FavoriteTable";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getSymbols());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="table" element={<TableComponent />}></Route>
        <Route path="favorite" element={<FavoriteTable />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
