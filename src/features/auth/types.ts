export interface RegistrationPayload {
  email: string | null;
  username: string | null;
  password: string | null;
  device: string | null;
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
  type: "email" | "username";
  Id: string | null;
  password: string | null;
  device: string | null;
}

export interface LoginFormStatus {
  Id: FormStatus;
  password: PasswordFormStatus;
}
