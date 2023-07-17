import { createReducer } from "@reduxjs/toolkit"
import { wsClose, wsOpen, wsMessage, wsConnecting, wsError } from "../actions/wsActions"

const WebsocketStatus = {
    CONNECTING: 'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

const initialState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    error: '',
    totalOrders: 0,
    totalOrdersToday: 0
};

export const wsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsMessage, (state, action) => {
            state.orders = action.payload.orders
            state.totalOrders = action.payload.totalOrders
            state.totalOrdersToday = action.payload.totalOrdersToday
        })
        .addCase(wsError, (state, action) => {
            state.error = action.payload
        })
})
