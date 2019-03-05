import makeRequest from "../http-service";


async function initial(vacancyUrl) {
    const res = await makeRequest(vacancyUrl);
    const parserRes = JSON.parse(res);
    return {pages: parserRes.pages, found: parserRes.found}
}

export default initial
