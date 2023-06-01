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
  status: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload
        state.status = false
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = false
        state.error = action.payload
      });
  }
})

export default ingredientsSlice.reducer