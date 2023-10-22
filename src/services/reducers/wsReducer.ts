import { createReducer } from "@reduxjs/toolkit"
import { wsClose, wsOpen, wsMessage, wsConnecting, wsError } from "../actions/wsActions"
import { TOrder } from "../../utils/common-types";

const WebsocketStatus = {
    CONNECTING: 'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export type wsState = {
    status: string,
    orders: TOrder[],
    error: string,
    total: number | null,
    totalToday: number | null
  };

  
const initialState: wsState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    error: '',
    total: 0,
    totalToday: 0
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
        .addCase(wsMessage, (state, {payload}: any) => {
            state.orders = payload.orders ?? [];
            state.total = payload.total ?? null;
            state.totalToday = payload.totalToday ?? null;
        })
        .addCase(wsError, (state, { payload }) => {
            state.error =  payload ?? '';
        })
})
