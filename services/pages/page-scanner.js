import makeRequest from "../http-service";

async function get(page, url) {

    const requestURL = `${'https://api.hh.ru/vacancies?text=javascript&per_page=100&page=' + page }`;

    let parsedData;

    const frequency = [];
    try {
        const data = await makeRequest(url);
        parsedData = JSON.parse(data);

        for (let item of parsedData.items) {
            let result = await makeRequest(item.url);
            const parsedRes = JSON.parse(result);
            parsedRes.key_skills.forEach(skill => {
                frequency.push(skill);
            });
        }
        return frequency;
    }
    catch (e) {
        throw e
    }
}

export default get
