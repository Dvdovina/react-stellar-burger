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
  ingredientsStatus: false,
  ingredientsError: false,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsStatus = true
        state.ingredientsError = false
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload
        state.ingredientsStatus = false
        state.ingredientsError = false
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsStatus = false
        state.ingredientsError = true
      });
  }
})

export default ingredientsSlice.reducer