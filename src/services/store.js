import { configureStore } from '@reduxjs/toolkit'
import currentIngredientSlice from "./currentIngredientSlice"
import ingredientsSlice from './ingredientsSlice'
import constructorSlice from './constructorSlice'
import orderSlice from './orderSlice'
import userSlice from './userSlice'
import { socketMiddleware } from './middleware/websocketMiddleware'

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        currentIngredient: currentIngredientSlice,
        userBurgerIngredients: constructorSlice,
        order: orderSlice,
        user: userSlice
    },
})