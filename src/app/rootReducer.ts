import { combineReducers } from "redux";
import authSlice from "../features/auth/authSlice";
import appSlice from "./appSlice";

export const rootReducer = combineReducers({ app: appSlice, auth: authSlice });
