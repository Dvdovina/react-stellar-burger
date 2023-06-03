import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'userBurgerIngredients',
  initialState,
  reducers: {
    addIngredient(state, { item }) {
      if (item.type === 'bun') {
        state.bun = item
      } else {
        state.ingredients = [...state.ingredients, item]
      }
    },
    deleteIngredient(state, { item: id }) {
      state.ingredients = state.ingredients.filter(item => item._id !== id)
    },
    refreshIngredients(state, { items }) {
      state.ingredients = items
    }
  }
})


export default constructorSlice.reducer;
export const { addIngredient, deleteIngredient, refreshIngredients } = constructorSlice.actions