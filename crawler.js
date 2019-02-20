import makeRequest from './services/http-service'


import Technology from './databases/models/mongoose/technology'
import Frequency from "./databases/models/mongoose/frequency";
import sort from './utils/sort';
import pg_technologies from './databases/queries/postgress/technologies/index'

const allVacancies = 'https://api.hh.ru/vacancies?text=javascript&per_page=100&page=1';

pg_technologies.getTechnologies().then(technologies=>technologies.map(tech=>console.log(tech.name)));

async function get(page,url) {
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

const init = async () => {

    const technologies = await pg_technologies.getTechnologies();

    async function  make() {
        for(let tech of technologies){

            let vacancyUrl = `https://api.hh.ru/vacancies?text=${tech.name}&per_page=100&page=1`;

            const res = await makeRequest(vacancyUrl);
            const parserRes = JSON.parse(res);
            const result = [];
            const found = parserRes.found;
            const frequency = {};
            const pages = parserRes.pages;
            for (let i = 1; i < 2; i++) {
                console.log(i);
                let data = await get(i,vacancyUrl);
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

            let technology;
            let freq;
            try {

                technology = new Technology({name: tech.name, skills: JSON.stringify(slicedFreq)});
                freq = new Frequency({name: tech.name, total: found});

                const techAdded = await technology.save()

                console.log("techAdded",techAdded);
                const freqAdded = await  freq.save();
                console.log("freqAdded",freqAdded);

            } catch (e) {
                console.log(e)
            }

        }


    }
    // const mk = await make()
    return make()


};


export default init;
