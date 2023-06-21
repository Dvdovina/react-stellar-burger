import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
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