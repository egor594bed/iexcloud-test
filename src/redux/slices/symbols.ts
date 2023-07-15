import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService, { symbolData } from "../../services/api-service";

interface ISymbolsSlice {
  symbolsList: symbolData[] | [];
  activeSymbolsList: symbolData[] | [];
  loadingData: boolean;
}

const initialState: ISymbolsSlice = {
  symbolsList: [],
  activeSymbolsList: [],
  loadingData: false,
};

export const getSymbols = createAsyncThunk(
  "symbolSlice/getSymbols",
  async () => {
    try {
      return apiService.getSymbols();
    } catch (e) {}
  }
);

export const symbolsSlice = createSlice({
  name: "symbolsSlice",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.activeSymbolsList = state.symbolsList.slice(
        action.payload * 10 - 10,
        action.payload * 10
      );
    },
    rotateActiveList: (state, action: PayloadAction<symbolData[]>) => {
      state.activeSymbolsList = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSymbols.pending, (state) => {
      state.loadingData = true;
    });

    builder.addCase(getSymbols.fulfilled, (state, action) => {
      if (action.payload === null || action.payload === undefined) {
        state.symbolsList = [];
        state.activeSymbolsList = [];
        state.loadingData = false;
        return;
      }

      state.symbolsList = action.payload;
      state.activeSymbolsList = action.payload.slice(0, 10);
    });
  },
});

export const { changePage, rotateActiveList } = symbolsSlice.actions;

export default symbolsSlice.reducer;
