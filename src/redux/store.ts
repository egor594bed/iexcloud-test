import { configureStore } from "@reduxjs/toolkit";
import symbolsSlice from "./slices/symbols";

export const store = configureStore({
  reducer: {
    symbolsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
