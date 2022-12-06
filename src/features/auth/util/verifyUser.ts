import { userDbProxy } from "../../../app/db";
import { JWT, LocalUserData, } from "../../../app/types";
import jwt from "jwt-decode";

// This function performs the logic necessary to validate all requirements are met
// for bypassing the authentication flow of the application.

// Given the tokens and userId from local storage, it will return a boolean indicating whether the app can process to the home screen.

export const verifyUser = async (user: LocalUserData): Promise<boolean> => {
  if (!user.access || !user.refresh || !user.userId) return false;
    try {
      const exists = await userDbProxy.userExists(user.userId);
        if (exists === 0) {
            return false
        }
      const access: JWT = jwt(user.access as string);
      const refresh: JWT = jwt(user.refresh as string);
      if (access.user.userId != user.userId || refresh.user.userId != user.userId) {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  return true
};
