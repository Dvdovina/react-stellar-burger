import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredients: [],
  request: '',
  error: null,

};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => { }
})

export default ingredientsSlice.reducer