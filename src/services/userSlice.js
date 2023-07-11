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

//AsyncThunk Пользователь
export const getUser = createAsyncThunk(
  'user/getUser',
  async (token) => {
    try {
      const res = await getUserApi(token);
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
      const res = await postLogin(email, password);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
      setAuthChecked(true)
      return res;
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return res
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
  reducers: {
    setAuthChecked(state, action) {
      state.isAuthChecked  = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = false
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
export const { setAuthChecked } = userSlice.actions;