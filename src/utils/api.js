const config = {
    url: `https://norma.nomoreparties.space/api/ingredients`,
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


export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const getData = () => {
    return fetch(`${config.url}`,
        {
            method: "GET",
            headers: config.headers
        })
        .then(checkResponse)
        .catch((err) => {
            console.log(err);
        });
}

const postOrder = (order, options = {}, auth) => {
    return fetch(`${config.orderUrl}`,
        {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('accessToken'),
                "Content-Type": "application/json;charset=utf-8", ...options
            },
            body: JSON.stringify(order)
        })
        .then(checkResponse)
        .catch((err) => {
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
            },
        })
}


const patchUser = ({ name, email, password }) => {
    return fetchWithRefresh(`${config.userUrl}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                name, email, password
            }),
        });
};

//API регистрации
const postRegisterUser = ({ name, email, password }) => {
    return fetch(`${config.registerUrl}`,
        {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
        .then(checkResponse)
        .catch((err) => {
            console.log(err)
        });
}

//API Логин
const postLogin = ({ email, password }) => {
    return fetch(`${config.loginUrl}`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email,
                password,
            })
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
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            })
        })
}

//API Забытый пароль
const postForgotPass = ({ email }) => {
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
const postResetPass = ({ password, token }) => {
    return fetch(`${config.passResetUrl}`,
        {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                password, token
            })
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


const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
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