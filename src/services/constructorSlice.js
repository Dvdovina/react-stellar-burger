import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'userBurgerIngredients',
  initialState,
  reducers: {
    addIngredient(state, { payload }) {
      if (payload.type === 'bun') {
        state.bun = payload
      } else {
        state.ingredients = [...state.ingredients, payload]
      }
    },
    deleteIngredient(state, { payload: id }) {
      state.ingredients = state.ingredients.filter(item => item.id !== id)
    },
    refreshIngredients(state, { payload }) {
      state.ingredients = payload
    },
    clearOrder() {
      return initialState
    }
  }
})


export default constructorSlice.reducer;
export const { addIngredient, deleteIngredient, refreshIngredients, clearOrder } = constructorSlice.actions