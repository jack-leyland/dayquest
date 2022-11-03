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

export type RegistrationAPIResponse ={
  success: boolean
  message: string | null
  alreadyExists: string | null
  user: {
    email: string
    username: string,
    userId: string
  } | null
  token: string | null
  refresh: string | null
}

export type LoginAPIResponse = {
  success: boolean,
  message: string,
  access: string | null,
  refresh: string | null
  badField: "password" | "id"
}
