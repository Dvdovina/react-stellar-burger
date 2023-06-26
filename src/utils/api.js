const config = {
    url: `https://norma.nomoreparties.space/api/ingredients`,
    orderUrl: `https://norma.nomoreparties.space/api/orders`,
    registerUrl: `https://norma.nomoreparties.space/api/auth/register`,
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

//API регистрации
const postNewUser = (name, email, password) => {
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

export { getData, postOrder, postNewUser }