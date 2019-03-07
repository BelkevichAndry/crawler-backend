import Technology from './databases/models/mongoose/technology'
import Frequency from "./databases/models/mongoose/frequency";
import sort from './utils/sort';
import pg_technologies from './databases/queries/postgress/technologies/index'

import get from './services/pages/page-scanner'
import initial from './services/pages/initial-request'
import countFrequency from './utils/frequency';

const init = async () => {

    const technologies = await pg_technologies.getTechnologies();

    async function make() {
        for (let tech of technologies) {

            try {
                console.log("start tech ",tech)

                let vacancyUrl = `https://api.hh.ru/vacancies?text=${tech.name}`;

                const generalInfo = await initial(vacancyUrl);
                const {found: totalFound, pages: pagesAmount} = generalInfo;

                const vacancies = [];

                for (let i = 1; i <= pagesAmount-1; i++) {
                    let data = await get(i, vacancyUrl);
                    vacancies.push(data);
                    console.log("page",i)
                }

                const flat = vacancies.flatten(2);
                const frequency = countFrequency(flat)

                const sortedFreq = sort(frequency);
                let technology = new Technology({name: tech.name, skills: JSON.stringify(sortedFreq)})
                let freq = new Frequency({name: tech.name, total: totalFound});

                await technology.save()
                await freq.save()
            } catch (e) {
                throw new Error(e)
            }
        }
    }

    return await make()

};

export default init;
