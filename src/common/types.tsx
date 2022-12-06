export type User = {
  userId: string;
  username: string;
  email: string;
  deviceId: string;
  isOfflineUser: boolean;
  level: number;
  exp: number;
};

export type JWT = {
  exp: number;
  iat: number;
  user: {
    userId: string;
    username: string;
  };
};

export type LocalUserData = {
  access: string | null
  refresh: string | null
  userId: string | null 
}

export type UserExistsAPIReponse = {
  exists: boolean
}