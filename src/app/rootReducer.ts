import { combineReducers } from 'redux'
import authSlice from '../features/auth/authSlice'


export const rootReducer = combineReducers({auth:authSlice})