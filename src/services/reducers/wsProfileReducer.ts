import { createReducer } from "@reduxjs/toolkit"
import {
    wsProfileClose,
    wsProfileOpen,
    wsProfileConnecting,
    wsProfileError,
    wsProfileMessage
} from "../actions/wsActions"
import { TOrder } from "../../utils/common-types";

const WebsocketStatus = {
    CONNECTING: 'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export type wsProfileState = {
    status: string,
    orders: TOrder[],
    error: string,
};

const initialState: wsProfileState = {
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
        .addCase(wsProfileMessage, (state, { payload }: any) => {
            state.orders = payload.orders.reverse()
        })
        .addCase(wsProfileError, (state, { payload }) => {
            state.error = payload ?? '';
        })
})
