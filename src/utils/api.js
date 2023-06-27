const config = {
    url: `https://norma.nomoreparties.space/api/ingredients`,
    orderUrl: `https://norma.nomoreparties.space/api/orders`,
    registerUrl: `https://norma.nomoreparties.space/api/auth/register`,
    tokenUrl: `https://norma.nomoreparties.space/api/auth/token`,
    headers: {
        'Content-Type': 'application/json'
    }
};

const checkResponse = (res) => {
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

const postOrder = (order, options = {}) => {
    return fetch(`${config.orderUrl}`,
        {
            method: 'POST',
            headers: config.headers,
            ...options,
            body: JSON.stringify(order)
        })
        .then(checkResponse)
        .catch((err) => {
            console.log(err)
        });
}

//Токены

const getToken = ({ token }) => {
    return request('auth/user',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                token
            }),
        });
};


const patchToken = ({ token }) => {
    return request('auth/user',
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                token
            }),
        });
};

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
        if (err.message === "token expired") {
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

//API регистрации
const postNewUser = ({ name, email, password }) => {
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


const setTokens = ({accessToken, refreshToken}) => {
    localStorage.setItem('accessToken', accessToken.split(' ')[1])
    localStorage.setItem('refreshToken', refreshToken)
  }
  

export { getData, postOrder, getToken, patchToken, refreshToken, fetchWithRefresh, postNewUser, setTokens }