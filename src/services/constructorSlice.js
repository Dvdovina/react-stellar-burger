import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredient: [],
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
        state.ingredient = [...state.ingredient, item]
      }
    },
    deleteIngredient(state, { item: id }) {
      state.ingredient = state.ingredient.filter(item => item._id !== id)
    },
    refreshIngredients(state, { items }) {
      state.ingredient = items
    }
  }
})


export default constructorSlice.reducer;
export const { addIngredient, deleteIngredient, refreshIngredients } = constructorSlice.actions