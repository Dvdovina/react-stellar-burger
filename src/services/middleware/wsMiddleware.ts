import { Middleware, MiddlewareAPI, ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../hooks/useForm";

export type TWsActions = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsSendMessage?: ActionCreatorWithPayload<unknown>;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<unknown>;
    wsConnecting: ActionCreatorWithoutPayload;
    wsDisconnect: ActionCreatorWithPayload<any> ;
}


export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        return (next) => (action) => {
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
                socket.onerror = (event) => {
                    dispatch(onError('Error'));
                };
                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessage(parsedData));
                };
                socket.onclose = (event) => {
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