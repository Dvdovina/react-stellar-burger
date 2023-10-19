//Типы для апи

export type THeaders = {
  "Content-Type": string;
  authorization: string | null;
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