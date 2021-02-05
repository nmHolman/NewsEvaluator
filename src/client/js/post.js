// Asnyc Post
const postData = async (url, data) => {

    let ndata = {
        info: data
    }

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(ndata),
    });
};

export { postData }

