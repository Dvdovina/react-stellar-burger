import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  postRegisterUser,
  postLogin,
  postLogOut,
  getUserApi,
  patchUser,
  postForgotPass,
  postResetPass,
  checkResponse
} from '../utils/api';

import { TUserEmail, TUser, TUserLogin, TPasswordReset } from '../utils/api-types';

//AsyncThunk Пользователь
export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    try {
      const res = await getUserApi();
      return res;
    } catch (error:any) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: TUser) => {
    try {
      const res = await patchUser(payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
);

//AsyncThunk Регистрация
export const register = createAsyncThunk(
  'user/register',
  async (payload: TUser) => {
    try {
      const res = await postRegisterUser(payload);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
      return res
    } catch (error) {
      throw error;
    }
  },
);


//AsyncThunk Логин
export const login = createAsyncThunk(
  'user/login', 
  async (payload: TUserLogin) => {
    try {
      const response = await postLogin(payload);
      const data = await checkResponse(response);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
      return data
    } catch (error) {
      throw error;
    }
  },
);

//AsyncThunk Лог-аут
export const logOut = createAsyncThunk(
  'user/logOut',
  async () => {
    try {
      const res = await postLogOut();
      const data = await checkResponse(res);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return data
    } catch (error) {
      throw error;
    }
  },
);

//AsyncThunk Забытый пароль
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: TUserEmail) => {
    try {
      const res = await postForgotPass(email);
      return res
    } catch (error) {
      throw error;
    }
  },
);



//AsyncThunk Сбросить и поменять пароль
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (payload: TPasswordReset) => {
    try {
      const res = await postResetPass(payload);
      return res
    } catch (error) {
      throw error;
    }
  },
);


const initialState = {
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
      .addCase(getUser.rejected, (state, action) => {
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
      .addCase(updateUser.rejected, (state, action) => {
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
      .addCase(register.rejected, (state, action) => {
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
      .addCase(login.rejected, (state, action) => {
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
      .addCase(logOut.rejected, (state, action) => {
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
      .addCase(forgotPassword.rejected, (state, action) => {
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
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
});

export default userSlice.reducer;