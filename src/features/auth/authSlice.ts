import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
  authFlowActive: Boolean;
  modalToRender: "loader" | "login" | "register" | "picker";
  accessToken: String | null;
  refreshToken: String | null;
  previousModalHeight: number;
}

const initialState: AuthState = {
  authFlowActive: true,
  modalToRender: "loader",
  accessToken: null,
  refreshToken: null,
  previousModalHeight: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<String>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<String>) => {
      state.refreshToken = action.payload;
    },
    disableAuthNavigator: (state) => {
      state.authFlowActive = false;
    },
    enableAuthNavigator: (state) => {
      state.authFlowActive = true;
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

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const renderAuthNavigator = (state: RootState) =>
  state.auth.authFlowActive;
export const selectActiveModal = (state: RootState) => state.auth.modalToRender;
export const selectPreviousModalHeight = (state: RootState) =>
  state.auth.previousModalHeight;

export const {
  setAccessToken,
  setRefreshToken,
  disableAuthNavigator,
  enableAuthNavigator,
  setDisplayedModal,
  setPreviousModalHeight,
} = authSlice.actions;

export default authSlice.reducer;
