import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
  modalToRender: "loader" | "login" | "register" | "picker";
  activeUserId: string | null;
  previousModalHeight: number;
}

const initialState: AuthState = {
  modalToRender: "loader",
  activeUserId: null,
  previousModalHeight: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDisplayedModal: (
      state,
      action: PayloadAction<AuthState["modalToRender"]>
    ) => {
      state.modalToRender = action.payload;
    },
    setPreviousModalHeight: (
      state,
      action: PayloadAction<AuthState["previousModalHeight"]>
    ) => {
      state.previousModalHeight = action.payload;
    },
  },
});

export const selectActiveModal = (state: RootState) => state.auth.modalToRender;
export const selectPreviousModalHeight = (state: RootState) =>
  state.auth.previousModalHeight;

export const {
  setDisplayedModal,
  setPreviousModalHeight,
} = authSlice.actions;

export default authSlice.reducer;
