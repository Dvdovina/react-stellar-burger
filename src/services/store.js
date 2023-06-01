import { configureStore } from '@reduxjs/toolkit'
import currentIngredientSlice from "./currentIngredientSlice"
import ingredientsSlice from './ingredientsSlice'
import constructorSlice from './constructorSlice'

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        currentIngredient: currentIngredientSlice,
        userBurgerIngredients: constructorSlice
    },
})