import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  postRegisterUser,
  setTokens,
  deleteTokens,
  postLogin,
  postLogOut,
  getUserApi,
  patchUser,
  postForgotPass,
  postResetPass
} from '../utils/api';


//AsyncThunk Пользователь
export const getUser = createAsyncThunk(
  'user/getUser',
  async (payload) => {
    try {
      return await getUserApi(payload);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (name, email, password, thunkApi) => {
    try {
      return await patchUser(name, email, password);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);


//AsyncThunk Регистрация
export const register = createAsyncThunk(
  'user/register',
  async (name, email, password, thunkApi) => {
    try {
      return await postRegisterUser(name, email, password);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//AsyncThunk Логин
export const login = createAsyncThunk(
  'user/login',
  async (email, password, thunkApi) => {
    try {
      return await postLogin(email, password);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//AsyncThunk Лог-аут
export const logOut = createAsyncThunk(
  'user/logOut',
  async (payload, thunkApi) => {
    try {
      return await postLogOut(payload);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//AsyncThunk Забытый пароль
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email) => {
    try {
      return await postForgotPass(email);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//AsyncThunk Сбросить и поменять пароль
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (password, token) => {
    try {
      return await postResetPass(password, token);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);


const initialState = {
  user: {
    name: null,
    email: null,
  },
  loading: false,
  error: false,
  isAuth: false
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
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.loading = false
        state.error = false
        state.user = payload.user
        state.isAuth = true
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.isAuth = false
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(updateUser.fulfilled, (state, {payload}) => {
        state.loading = false
        state.error = false
        state.user = payload.user
        state.isAuth = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.isAuth = false
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(register.fulfilled, (state, {payload}) => {
        state.loading = false
        state.error = false
        state.user = payload.user
        state.isAuth = true
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
        state.isAuth = false
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
        state.user = payload.user
        state.isAuth = true
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(logOut.fulfilled, (state, {payload}) => {
        state.loading = false
        state.error = false
        state.user = payload.user
        state.isAuth = false
        deleteTokens()
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
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
        state.error = action.error
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
        state.error = action.error
      })
  }
});

export default userSlice.reducer;