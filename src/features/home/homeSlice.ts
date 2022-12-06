import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ExpHistoryRecord } from "./types";

export interface HomeState {
  expHistory: Array<ExpHistoryRecord> | null;
}
const initialState: HomeState = {
  expHistory: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setExpHistory: (state, action: PayloadAction<HomeState["expHistory"]>) => {
      state.expHistory = action.payload;
    },
  },
});

export const selectExpHistory = (state: RootState) => state.home.expHistory;

export const {setExpHistory}  = homeSlice.actions

export default homeSlice.reducer