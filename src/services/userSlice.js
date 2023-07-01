import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postNewUser, setTokens, postLogin, postLogOut } from '../utils/api';


//AsyncThunk Регистрация
export const register = createAsyncThunk(
  'user/register',
  async (name, email, password, thunkApi) => {
    try {
      return await postNewUser(name, email, password);
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
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.user = action.payload;
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
        state.user = action.payload;
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
  }
});

export default userSlice.reducer;