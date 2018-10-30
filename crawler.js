import makeRequest from './services/http-service'


import Technology from './models/technology'
import Frequency from "./models/frequency";
import sort from './utils/sort';

const allVacancies = 'https://api.hh.ru/vacancies?text=javascript&per_page=100&page=1';

async function get(page) {
    const requestURL = `${'https://api.hh.ru/vacancies?text=javascript&per_page=100&page=' + page }`;
    let parsedData;

    const frequency = [];
    try {
        const data = await makeRequest(requestURL);
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

const init = async () => {
    const res = await makeRequest(allVacancies);
    const parserRes = JSON.parse(res);
    const result = [];
    const found = parserRes.found;
    const frequency = {};
    const pages = parserRes.pages;
    for (let i = 1; i < pages; i++) {
        console.log(i);
        let data = await get(i);
        result.push(data);
    }
    const flat = result.flatten(2);

    flat.forEach(skill => {
        if (skill.name in frequency) {
            frequency[skill.name]++;
        }
        else {
            frequency[skill.name] = 1;
        }
    });

    const slicedFreq = sort(frequency);

    try {

        const js = new Technology({name: "javascript", skills: JSON.stringify(slicedFreq)});
        const frq = new Frequency({name: "javascript", total: found});

        return js.save().then((res) => {
            return res
        }).then(()=>{
            return frq.save().then(()=>{})
        })
    } catch (e) {
        console.log(e)
    }



};


export default init;
