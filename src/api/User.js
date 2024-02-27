const TIME_OUT = 300 * 1000;

const statusError ={
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"]
    }
};

const requestPromise = (url, option) => {
    return fetch(url, option);
}

const timeoutPromise = () => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), TIME_OUT));
};

const getPromise = async (url, option) => {
    return await Promise.race([
        requestPromise(url, option),
        timeoutPromise()
    ]);
};

export const loginUser = async(credentials) => {
    const option = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(credentials)
    };

    const data = await getPromise('http:127.0.0.1:8080/login', option).catch(() => {
        return statusError;
    });

    if(parseInt(Number(data.status) / 100) === 2) {
        const status = data.ok;
        const code = data.status;
        const text = await data.text();
        const json = text.length ? JSON.parse(text) : "";

        return{
            status,
            code,
            json
        };
    } else {
        return statusError;
    }
}