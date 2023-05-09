const config = {
    url: `https://norma.nomoreparties.space/api/ingredients`,
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

export { getData }