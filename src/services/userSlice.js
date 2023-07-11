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

//AsyncThunk Пользователь
export const getUser = createAsyncThunk(
  'user/getUser',
  async (payload) => {
    try {
      const res = await getUserApi(payload);
      return res;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (name, email, password) => {
    try {
      const res = await patchUser(name, email, password);
      return res;
    } catch (error) {
      throw error;
    }
  },
);

//AsyncThunk Регистрация
export const register = createAsyncThunk(
  'user/register',
  async (name, email, password) => {
    try {
      const res = await postRegisterUser(name, email, password);
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
  async (email, password) => {
    try {
      const response = await postLogin(email, password);
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
  async (email) => {
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
  async (password, token) => {
    try {
      const res = await postResetPass(password, token);
      return res
    } catch (error) {
      throw error;
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
        state.error = action.error.message
        state.isAuthChecked = true;
        state.user = null
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
        state.error = action.error.message
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
        state.error = action.error
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
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
        state.error = action.error.message
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
        state.error = action.error.message
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
        state.error = action.error.message
      })
  }
});

export default userSlice.reducer;