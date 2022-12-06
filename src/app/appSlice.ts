import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from "./types";

export interface AppState {
  accessToken: string | null;
  refreshToken: string | null;
  activeUser: User | null;
  offlineMode: boolean;
  globalErrorMessage: string| null
}

const initialState: AppState = {
  accessToken: null,
  refreshToken: null,
  activeUser: null,
  offlineMode: false,
  globalErrorMessage: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveUser: (
      state,
      action: PayloadAction<AppState["activeUser"]>
    ) => {
      state.activeUser = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<AppState["accessToken"]>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (
      state,
      action: PayloadAction<AppState["refreshToken"]>
    ) => {
      state.refreshToken = action.payload;
    },
    setOfflineMode: (
      state,
      action: PayloadAction<AppState["offlineMode"]>
    ) => {
      state.offlineMode = action.payload;
    },
    setGlobalErrorMessage: (
      state,
      action: PayloadAction<AppState["globalErrorMessage"]>
    ) => {
      state.globalErrorMessage = action.payload;
    },
  },
});

export const selectActiveUser = (state: RootState) => state.app.activeUser;
export const selectAccessToken = (state: RootState) => state.app.accessToken;
export const selectRefreshToken = (state: RootState) => state.app.refreshToken;
export const selectOfflineMode = (state: RootState) => state.app.offlineMode;
export const selectGlobalErrorMessage = (state: RootState) => state.app.globalErrorMessage;


export const {setAccessToken, setActiveUser, setRefreshToken, setOfflineMode, setGlobalErrorMessage}  = appSlice.actions

export default appSlice.reducer