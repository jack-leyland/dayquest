import * as SecureStore from "expo-secure-store";
import { SuccessfulLoginAPIResponse } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../../common/types";

// NOTE: These functions will eventually be replaced with react-thunk once the application is more mature.

// These function are intended to be used as "middleware" for persisting things that are stored outside of the SQLite db.
// They will return the same data passed to them such that a call to one of these can be placed in a dispatch to redux.

// IMPORTANT: This will fail silently if the keychain is not availabale on the device (once logging is implemented it will be logged at least)
// If an appropriate refresh token can't be found during normal use of the app because of a failed save, the user will be asked to authenticate again.

// TODO: Investigate ways to better dealing with this failure case. If the keychain fails everytime for some reason, the user will have to login everytime
// they open the app to get new tokens.

export const persistAccessToken = (
  token: SuccessfulLoginAPIResponse["access"]
): SuccessfulLoginAPIResponse["access"] => {
  if (!token) return token;
  const save = async () => {
    try {
      await SecureStore.setItemAsync("last_user_access", token);
    } catch (e) {
      console.log(e);
    }
  };
  save();
  return token;
};

export const persistRefreshToken = (
  token: SuccessfulLoginAPIResponse["refresh"]
): SuccessfulLoginAPIResponse["refresh"] => {
  if (!token) return token;
  const save = async () => {
    try {
      await SecureStore.setItemAsync("last_user_refresh", token);
    } catch (e) {
      console.log(e);
    }
  };
  save();
  return token;
};

export const persistUserId = (user: User): User => {
  
  const save = async () => {
    try {
      await AsyncStorage.setItem("last_user_id", user.userId);
    } catch (e) {
      console.log(e);
    }
  };
  save();
  return user;
};
