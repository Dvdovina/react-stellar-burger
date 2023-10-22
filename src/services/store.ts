import { configureStore } from '@reduxjs/toolkit'
import currentIngredientSlice from "./currentIngredientSlice"
import ingredientsSlice from './ingredientsSlice'
import constructorSlice from './constructorSlice'
import orderSlice from './orderSlice'
import userSlice from './userSlice'
import { wsReducer } from './reducers/wsReducer'
import { wsProfileReducer } from './reducers/wsProfileReducer'
import { socketMiddleware } from './middleware/wsMiddleware'
import {
    wsOpen,
    wsClose,
    wsConnect,
    wsDisconnect,
    wsConnecting,
    wsMessage,
    wsError,
    wsProfileOpen,
    wsProfileClose,
    wsProfileConnect,
    wsProfileDisconnect,
    wsProfileConnecting,
    wsProfileMessage,
    wsProfileError
} from './actions/wsActions'

const ordersMiddlware = socketMiddleware({
    onOpen: wsOpen,
    onClose: wsClose,
    wsConnect: wsConnect,
    wsDisconnect: wsDisconnect,
    wsConnecting: wsConnecting,
    onMessage: wsMessage,
    onError: wsError,
});

const ordersProfileMiddlware = socketMiddleware({
    onOpen: wsProfileOpen,
    onClose: wsProfileClose,
    wsConnect: wsProfileConnect,
    wsDisconnect: wsProfileDisconnect,
    wsConnecting: wsProfileConnecting,
    onMessage: wsProfileMessage,
    onError: wsProfileError
});

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        currentIngredient: currentIngredientSlice,
        userBurgerIngredients: constructorSlice,
        order: orderSlice,
        user: userSlice,
        feed: wsReducer,
        profileOrders: wsProfileReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(ordersMiddlware, ordersProfileMiddlware);
    },
})
