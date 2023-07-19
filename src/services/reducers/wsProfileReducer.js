import { createReducer } from "@reduxjs/toolkit"
import {
    wsProfileClose,
    wsProfileOpen,
    wsProfileConnecting,
    wsProfileError,
    wsProfileMessage
} from "../actions/wsActions"

const WebsocketStatus = {
    CONNECTING: 'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

const initialState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    error: '',
};

export const wsProfileReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsProfileOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsProfileClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsProfileConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsProfileMessage, (state, action) => {
            state.orders = action.payload.orders
        })
        .addCase(wsProfileError, (state, action) => {
            state.error = action.payload
        })
})
