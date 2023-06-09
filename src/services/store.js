import { configureStore } from '@reduxjs/toolkit'
import currentIngredientSlice from "./currentIngredientSlice"
import ingredientsSlice from './ingredientsSlice'
import constructorSlice from './constructorSlice'
import orderSlice from './orderSlice'

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        currentIngredient: currentIngredientSlice,
        userBurgerIngredients: constructorSlice,
        order: orderSlice
    },
})