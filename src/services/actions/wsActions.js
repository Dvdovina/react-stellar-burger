import { createAction } from "@reduxjs/toolkit";

export const wsOpen = createAction('WS_OPEN');
export const wsClose = createAction('WS_CLOSE');
export const wsConnect = createAction('WS_CONNECT')
export const wsDisconnect = createAction('WS_DISCONNECT');
export const wsConnecting = createAction('WS_CONNECTING');
export const wsMessage = createAction('WS_MESSAGE');
export const wsError = createAction('WS_ERROR');
