import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postNewUser } from '../utils/api';


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


const initialState = {
  user: {},
  token: null,
  registerUserStatus: false,
  registerUserError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerUserStatus = true
        state.registerUserError = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUserStatus = false
        state.registerUserError = false
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserStatus = false
        state.registerUserError = true
      });
  }
});

export default userSlice.reducer;