import { configureStore } from '@reduxjs/toolkit'
import currentIngredientSlice from "./currentIngredientSlice"
import ingredientsSlice from './ingredientsSlice'

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        currentIngredient: currentIngredientSlice
    },
})