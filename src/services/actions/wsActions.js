import { createAction } from "@reduxjs/toolkit";

export const wsOpen = createAction('WS_OPEN');
export const wsClose = createAction('WS_CLOSE');
export const wsConnect = createAction('WS_CONNECT')
export const wsDisconnect = createAction('WS_DISCONNECT');
export const wsConnecting = createAction('WS_CONNECTING');
export const wsMessage = createAction('WS_MESSAGE');
export const wsError = createAction('WS_ERROR');


export const wsProfileOpen = createAction('WS_PROFILE_OPEN');
export const wsProfileClose = createAction('WS_PROFILE_CLOSE');
export const wsProfileConnect = createAction('WS_PROFILE_CONNECT')
export const wsProfileDisconnect = createAction('WS_PROFILE_DISCONNECT');
export const wsProfileConnecting = createAction('WS_PROFILE_CONNECTING');
export const wsProfileMessage = createAction('WS_PROFILE_MESSAGE');
export const wsProfileError = createAction('WS_PROFILE_ERROR');
