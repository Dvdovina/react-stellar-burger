import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserApi } from '../utils/api';


export const getUser = createAsyncThunk(
  'user/getUser',
  async (payload) => {
    try {
      return await getUserApi(payload);
    }
    catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


const initialState = {
  user: {
    name: null,
    email: null
  },
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;