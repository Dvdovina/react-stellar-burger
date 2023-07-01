import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  postRegisterUser,
  setTokens,
  deleteTokens,
  postLogin,
  postLogOut,
  getUser,
  patchUser,
  postForgotPass,
  postResetPass
} from '../utils/api';



//AsyncThunk Пользователь
export const createUser = createAsyncThunk(
  'user/createUser',
  async (payload) => {
    try {
      return await getUser(payload);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (name, email, password) => {
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
  user: {},
  token: null,
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
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false
        state.error = false
        state.user = action.payload
        state.isAuth = true
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false
        state.error = true
        state.isAuth = false
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false
        state.error = false
        state.user = action.payload
        state.isAuth = true
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false
        state.error = true
        state.isAuth = false
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.user = action.payload
        state.isAuth = true
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
      })
      .addCase(register.rejected, (state) => {
        state.loading = false
        state.error = true
        state.isAuth = false
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.user = action.payload
        state.isAuth = true
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.error = true
        state.isAuth = false
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.user = {}
        state.isAuth = false
        deleteTokens()
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