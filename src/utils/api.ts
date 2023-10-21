import { TUser, TUserLogin, TUserEmail, TPasswordReset, THeaders, TResponse } from "./api-types";
import { TIngredient, TOrder } from "./common-types";

export const WS_FEED_URL = "wss://norma.nomoreparties.space/orders/all";
export const WS_PROFILE_URL = "wss://norma.nomoreparties.space/orders"

const BASE_URL = "https://norma.nomoreparties.space/api/";


export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const request = <T>(
    endpoint: RequestInfo | URL,
    options?: RequestInit
): Promise<T> => {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

const config = {
    baseUrl: `https://norma.nomoreparties.space/api/`,
    ingredientsUrl: `https://norma.nomoreparties.space/api/ingredients`,
    orderUrl: `https://norma.nomoreparties.space/api/orders`,
    registerUrl: `https://norma.nomoreparties.space/api/auth/register`,
    tokenUrl: `https://norma.nomoreparties.space/api/auth/token`,
    loginUrl: `https://norma.nomoreparties.space/api/auth/login`,
    logoutUrl: `https://norma.nomoreparties.space/api/auth/logout`,
    userUrl: `https://norma.nomoreparties.space/api/auth/user`,
    passForgotUrl: `https://norma.nomoreparties.space/api/password-reset`,
    passResetUrl: `https://norma.nomoreparties.space/api/password-reset/reset`,
    headers: {
        'Content-Type': 'application/json'
    }
};


const getData = (): Promise<
    TResponse<"data", TIngredient[]>
> => {
    return request("ingredients");
};

const postOrder = (item: (string | undefined)[]): Promise<TResponse<'order', Readonly<TOrder>>> => {
    return request("orders",
        {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('accessToken')!,
                "Content-Type": "application/json;charset=utf-8",
            } as (HeadersInit | undefined) & THeaders,
            body: JSON.stringify({ ingredients: item })
        })
}

//API Пользователь
const getUserApi = (): Promise<TResponse<'user', Readonly<TUser>>> => {
    return fetchWithRefresh("auth/user",
        {
            method: "GET",
            headers: {
                authorization: localStorage.getItem('accessToken'),
                "Content-Type": "application/json;charset=utf-8",
            } as (HeadersInit | undefined) & THeaders,
        })
}

const patchUser = (data: TUser) => {
    return fetchWithRefresh("auth/user",
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem('accessToken')
            } as (HeadersInit | undefined) & THeaders,
            body: JSON.stringify(data),
        });
};

//API регистрации
const postRegisterUser = (data: TUser): Promise<TResponse<'user', Readonly<TUser>>> => {
    return request("auth/register",
        {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(data)
        })

}

//API Логин
const postLogin = (data: TUserLogin): Promise<TResponse<'user', Readonly<TUser>>> => {
    return request("auth/login",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data)
        })
}

//API Лог-аут
const postLogOut = (): Promise<TResponse<'user', Readonly<TUser>>> => {
    return request("auth/logout",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken')
            } as (HeadersInit | undefined) & THeaders,
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            })
        })
}

//API Забытый пароль
const postForgotPass = (email: TUserEmail): Promise<TResponse<'pass-forgot', string>> => {
    return request("password-reset",
        {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                email
            })
        })
}
//API Сбросить и поменять пароль
const postResetPass = (data: TPasswordReset): Promise<TResponse<'pass-reset', string>> => {
    return request("password-reset/reset",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken')
            } as (HeadersInit | undefined) & THeaders,
            body: JSON.stringify(
                data
            )
        })
}

//Токены
const refreshToken = (): Promise<TResponse> => {
    return request("auth/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        })
};


const fetchWithRefresh = async (url: string, options: RequestInit & { headers: { authorization: string | null, "Content-Type": string } }
): Promise<TResponse<'user', Readonly<TUser>>> => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${BASE_URL}${url}`, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


export { getData, postOrder, getUserApi, patchUser, refreshToken, fetchWithRefresh, postRegisterUser, postLogin, postLogOut, postForgotPass, postResetPass }