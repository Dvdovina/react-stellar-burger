import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getData } from '../utils/api'


export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getData()
    return response.data
  }
)

const initialState = {
  ingredients: [],
  request: '',
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.request = true
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload
        state.request = false
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.request = false
        state.error = action.payload
      });
  }
})

export default ingredientsSlice.reducer