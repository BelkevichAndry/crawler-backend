const request = require('request-promise-native');

const options = (url) => {
    return {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }
};

const makeRequest = async url => {
    return await request(options(url));
};

export default makeRequest