import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postNewUser, setTokens, postLogin } from '../utils/api';


//AsyncThunk Регистрация
export const registerUser = createAsyncThunk(
  'user/register',
  async (name, email, password) => {
    try {
      return await postNewUser(name, email, password);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//AsyncThunk Логин
export const loginUser = createAsyncThunk(
  'user/login',
  async (email, password) => {
    try {
      return await postLogin(email, password);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);



const initialState = {
  user: {},
  token: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.user = action.payload;
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true
        state.error = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        setTokens({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })
  }
});

export default userSlice.reducer;