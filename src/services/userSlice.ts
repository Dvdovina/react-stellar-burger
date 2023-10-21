import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  postRegisterUser,
  postLogin,
  postLogOut,
  getUserApi,
  patchUser,
  postForgotPass,
  postResetPass,
} from '../utils/api';

import { TUser, TUserLogin } from '../utils/api-types';

//AsyncThunk Пользователь
export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const updateUser = createAsyncThunk("user/updateUser", patchUser);

//AsyncThunk Регистрация
export const register = createAsyncThunk(
  'user/register',
  async (payload: TUser) => {
    const res = await postRegisterUser(payload);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("accessToken", res.accessToken);
    return res
  },
);

//AsyncThunk Логин
export const login = createAsyncThunk(
  'user/login',
  async (payload: TUserLogin) => {
    const res = await postLogin(payload);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("accessToken", res.accessToken);
    return res
  },
);

//AsyncThunk Лог-аут
export const logOut = createAsyncThunk(
  'user/logOut',
  async () => {
    const res = await postLogOut();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return res
  },
);

//AsyncThunk Забытый пароль
export const forgotPassword = createAsyncThunk('user/forgotPassword', postForgotPass);

//AsyncThunk Сбросить и поменять пароль
export const resetPassword = createAsyncThunk('user/resetPassword', postResetPass);

export type TUserState = {
  user: {
    name: string,
    email: string,
  },
  loading: boolean,
  error: boolean,
  isAuthChecked: boolean,
};

const initialState: TUserState = {
  user: {
    name: '',
    email: '',
  },
  loading: false,
  error: false,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = false
        state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = false
        state.user = payload.user
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false
        state.error = true
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = false
        state.user = payload.user
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = false
        state.user = payload.user
      })
      .addCase(register.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user
        state.loading = false
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(logOut.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = false
        state.user = payload.user
      })
      .addCase(logOut.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  }
});

export default userSlice.reducer;