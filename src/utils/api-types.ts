//Типы для апи

export type THeaders = {
  "Content-Type": string;
  authorization: string | null;
};

export type TResponse<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
  refreshToken: string;
  accessToken: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
}

export type TUserLogin = {
  email: string;
  password: string;
}

export type TUserEmail = {
  email: string;
}

export type TPasswordReset = {
  password: string;
  token: string;
};