import { MiddlewareAPI } from "@reduxjs/toolkit";


export const socketMiddleware = (wsActions: any) => {
    return (store: MiddlewareAPI) => {
        let socket: any = null;
        return (next: any) => (action: any) => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;
            if (type === wsConnect.type) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };
                socket.onerror = (event:any) => {
                    dispatch(onError('Error'));
                };
                socket.onmessage = (event:any) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessage(parsedData));
                };
                socket.onclose = (event:any) => {
                    dispatch(onClose());
                };
                if (wsSendMessage && type === wsSendMessage.type) {
                    socket.send(JSON.stringify(action.payload));
                }
                if (wsDisconnect.type === type) {
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        };
    };
};