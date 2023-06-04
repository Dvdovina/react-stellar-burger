const config = {
    url: `https://norma.nomoreparties.space/api/ingredients`,
    orderUrl: `https://norma.nomoreparties.space/api/orders`,
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

const postOrder = (ingredients) => {
    return fetch(`${config.orderUrl}`,
        {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({ingredients})
        })
        .then(checkResponse)
        .catch((err) => {
            console.log(err)
        });
}

export { getData, postOrder }