import { combineReducers } from "redux";
import authSlice from "../features/auth/authSlice";
import homeSlice from "../features/home/homeSlice";
import appSlice from "./appSlice";

export const rootReducer = combineReducers({ app: appSlice, auth: authSlice, home:homeSlice });
