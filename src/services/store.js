import { configureStore } from '@reduxjs/toolkit'
import currentIngredientReducer from "./currentIngredientSlice"

export const store = configureStore({
    reducer: {
        currentIngredient: currentIngredientReducer
    },
})