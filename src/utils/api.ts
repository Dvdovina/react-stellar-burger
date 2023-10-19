import { TUser, TUserLogin, TUserEmail, TPasswordReset } from "./api-types";
import { THeaders } from "./api-types";


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

export const WS_FEED_URL = "wss://norma.nomoreparties.space/orders/all";
export const WS_PROFILE_URL = "wss://norma.nomoreparties.space/orders"


export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const getData = () => {
    return fetch(`${config.ingredientsUrl}`,
        {
            method: "GET",
            headers: config.headers
        })
        .then(checkResponse)
        .catch((err: any) => {
            console.log(err);
        });
}

const postOrder = (item: (string | undefined)[]) => {
    return fetchWithRefresh(`${config.orderUrl}`,
        {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('accessToken')!,
                "Content-Type": "application/json;charset=utf-8",
            } as (HeadersInit | undefined) & THeaders,
            body: JSON.stringify({ingredients: item})
        })
        .catch((err: any) => {
            console.log(err)
        });
}

//API Пользователь
const getUserApi = () => {
    return fetchWithRefresh(`${config.userUrl}`,
        {
            method: "GET",
            headers: {
                authorization: localStorage.getItem('accessToken'),
                "Content-Type": "application/json;charset=utf-8",
            } as (HeadersInit | undefined) & THeaders,
        })
}


const patchUser = (data: TUser) => {
    return fetchWithRefresh(`${config.userUrl}`,
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
const postRegisterUser = (data: TUser) => {
    return fetch(`${config.registerUrl}`,
        {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(data)
        })
        .then(checkResponse)
        .catch((err: any) => {
            console.log(err)
        });
}

//API Логин
const postLogin = (data: TUserLogin) => {
    return fetch(`${config.loginUrl}`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data)
        })
}

//API Лог-аут
const postLogOut = () => {
    return fetch(`${config.logoutUrl}`,
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
const postForgotPass = (email: TUserEmail ) => {
    return fetch(`${config.passForgotUrl}`,
        {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                email
            })
        })
}
//API Сбросить и поменять пароль
const postResetPass = (data: TPasswordReset) => {
    return fetch(`${config.passResetUrl}`,
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
const refreshToken = () => {
    return fetch(`${config.tokenUrl}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        }).then(checkResponse);
};


const fetchWithRefresh = async (url: string, options:  RequestInit & { headers: { authorization: string | null, "Content-Type": string } }) => {
    try {
        const res = await fetch(url, options);
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
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


export { getData, postOrder, getUserApi, patchUser, refreshToken, fetchWithRefresh, postRegisterUser, postLogin, postLogOut, postForgotPass, postResetPass }