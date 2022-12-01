import { Data } from "victory-core";

export interface RegistrationPayload {
  email: string | null;
  username: string | null;
  password: string | null;
}

export type FormStatus = {
  badInputText: string;
  isBadInput: boolean;
};
export type PasswordFormStatus = {
  criteria: Array<string>;
  isBadInput: boolean;
};

export interface RegistrationFormStatus {
  email: FormStatus;
  username: FormStatus;
  password: PasswordFormStatus;
}

export interface LoginPayload {
  id: string | null;
  password: string | null;
}

export interface LoginFormStatus {
  id: FormStatus;
  password: PasswordFormStatus;
}

export interface CommonRegistrationAPIResponse {
  success: boolean
}

export interface SuccessfulRegistrationAPIResponse extends CommonRegistrationAPIResponse {
  user: {
    email: string
    username: string,
    userId: string
  }
  token: string
  refresh: string
}

export interface UnsuccessfulRegistrationAPIResponse extends CommonRegistrationAPIResponse {
  message: string
  alreadyExists: "username" | "email"
}

export type RegistrationAPIResponse = SuccessfulRegistrationAPIResponse | UnsuccessfulRegistrationAPIResponse

export function isSuccessfulRegistrationResponse(response: RegistrationAPIResponse): response is SuccessfulRegistrationAPIResponse {
  const arg = response as SuccessfulRegistrationAPIResponse
  return arg !== undefined &&  arg.user !== undefined && arg.refresh !== undefined && arg.token !== undefined 
}

export function isUnsuccessfulRegistrationResponse(response: RegistrationAPIResponse): response is UnsuccessfulRegistrationAPIResponse {
  const arg = response as UnsuccessfulRegistrationAPIResponse
  return arg !== undefined &&  arg.message !== undefined && arg.alreadyExists !== undefined
}

export interface CommonLoginAPIResponse {
  success: boolean,
}

export interface SuccessfulLoginAPIResponse extends CommonLoginAPIResponse {
  access: string,
  refresh: string
}

export interface UnsuccessfulLoginAPIResponse extends CommonLoginAPIResponse {
  message: string,
  badField: "password" | "id"
}

export type LoginAPIResponse = SuccessfulLoginAPIResponse | UnsuccessfulLoginAPIResponse

export function isSuccessfulLoginResponse(response: LoginAPIResponse): response is SuccessfulLoginAPIResponse {
  const arg = response as SuccessfulLoginAPIResponse
  return arg !== undefined &&  arg.access !== undefined && arg.refresh !== undefined
}

export function isUnsuccessfulLoginResponse(response: LoginAPIResponse): response is UnsuccessfulLoginAPIResponse {
  const arg = response as UnsuccessfulLoginAPIResponse
  return arg !== undefined &&  arg.message !== undefined && arg.badField !== undefined
}
