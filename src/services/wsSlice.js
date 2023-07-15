import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    error: null,
    isOnline: false
};

export const wsSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        onOpen(state) {
            state.isOnline = true;
        },
        onClose(state) {
            state.isOnline = false;
        },
        wsConnect(state) {
            state.isOnline = true;
        },
        wsDisconnect(state) {
            state.isOnline = false;
        },
        onMessage(state) {
            state.isOnline = true;
        },
        onError(state) {
            state.isOnline = false;
        }
    },
})


export default wsSlice.reducer
export const { onOpen, onClose, wsConnect, wsDisconnect, onMessage, onError } = wsSlice.actions