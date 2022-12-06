import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
  modalToRender: "loader" | "login" | "register" | "picker";
  overlayErrorModal: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  activeUserId: string | null;
  previousModalHeight: number;
}

const initialState: AuthState = {
  modalToRender: "loader",
  overlayErrorModal: false,
  accessToken: null,
  refreshToken: null,
  activeUserId: null,
  previousModalHeight: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    overlayErrorModal: (
      state,
      action: PayloadAction<AuthState["overlayErrorModal"]>
    ) => {
      state.overlayErrorModal = action.payload;
    },
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

export const renderErrorModal = (state: RootState) =>
  state.auth.overlayErrorModal;
export const selectActiveModal = (state: RootState) => state.auth.modalToRender;
export const selectPreviousModalHeight = (state: RootState) =>
  state.auth.previousModalHeight;

export const {
  setDisplayedModal,
  setPreviousModalHeight,
  overlayErrorModal,
} = authSlice.actions;

export default authSlice.reducer;
