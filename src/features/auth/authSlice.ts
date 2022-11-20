import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
  authFlowActive: Boolean;
  modalToRender: "loader" | "login" | "register" | "picker";
  overlayErrorModal: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  activeUserId: string | null;
  previousModalHeight: number;
  overlayErrorMessage: string | null;
}

const initialState: AuthState = {
  authFlowActive: true,
  modalToRender: "loader",
  overlayErrorModal: false,
  accessToken: null,
  refreshToken: null,
  activeUserId: null,
  previousModalHeight: 0,
  overlayErrorMessage:
    "This usually happens when there's a problem with our servers, or you are not connected to the internet.\n\nPlease try again a little bit later!",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    disableAuthNavigator: (state) => {
      state.authFlowActive = false;
    },
    enableAuthNavigator: (state) => {
      state.authFlowActive = true;
    },
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
    setOverlayErrorMessage: (
      state,
      action: PayloadAction<AuthState["overlayErrorMessage"]>
    ) => {
      state.overlayErrorMessage = action.payload;
    },
  },
});

export const renderErrorModal = (state: RootState) =>
  state.auth.overlayErrorModal;
export const renderAuthNavigator = (state: RootState) =>
  state.auth.authFlowActive;
export const selectActiveModal = (state: RootState) => state.auth.modalToRender;
export const selectPreviousModalHeight = (state: RootState) =>
  state.auth.previousModalHeight;
export const selectOverlayErrorMessage = (state: RootState) =>
  state.auth.overlayErrorMessage;

export const {
  disableAuthNavigator,
  enableAuthNavigator,
  setDisplayedModal,
  setPreviousModalHeight,
  overlayErrorModal,
  setOverlayErrorMessage,
} = authSlice.actions;

export default authSlice.reducer;
