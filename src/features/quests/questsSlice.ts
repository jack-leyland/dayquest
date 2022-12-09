import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface HomeState {
}

const initialState: HomeState = {
  expHistory: null,
};

export const homeSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {
  },
});

export const selectExpHistory = (state: RootState) => state.home.expHistory;

export const {}  = homeSlice.actions

export default homeSlice.reducer