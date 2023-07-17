import { configureStore} from '@reduxjs/toolkit'
import currentIngredientSlice from "./currentIngredientSlice"
import ingredientsSlice from './ingredientsSlice'
import constructorSlice from './constructorSlice'
import orderSlice from './orderSlice'
import userSlice from './userSlice'
import { wsReducer } from './reducers/wsReducer'
import { socketMiddleware } from './middleware/wsMiddleware'
import { wsOpen, wsClose, wsConnect, wsDisconnect, wsConnecting, wsMessage, wsError } from './actions/wsActions'

const ordersMiddlware = socketMiddleware({
    onOpen: wsOpen,
    onClose: wsClose,
    wsConnect: wsConnect,
    wsDisconnect: wsDisconnect,
    wsConnecting: wsConnecting,
    onMessage: wsMessage,
    onError: wsError,
});



export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        currentIngredient: currentIngredientSlice,
        userBurgerIngredients: constructorSlice,
        order: orderSlice,
        user: userSlice,
        orders: wsReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(ordersMiddlware);
    },
})