import { createSlice } from '@reduxjs/toolkit'
import { TConstructor } from '../utils/common-types';


const initialState: TConstructor = {
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
    deleteIngredient(state, { payload: index }) {
      state.ingredients.splice(index, 1)
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