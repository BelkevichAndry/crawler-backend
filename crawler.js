import Technology from './databases/models/mongoose/technology'
import Frequency from "./databases/models/mongoose/frequency";
import sort from './utils/sort';
import pg_technologies from './databases/queries/postgress/technologies/index'

import get from './services/pages/page-scanner'
import initial from './services/pages/initial-request'
import frequency from './utils/frequency';

const init = async () => {

    const technologies = await pg_technologies.getTechnologies();

    async function make() {
        for (let tech of technologies) {

            try {

                let vacancyUrl = `https://api.hh.ru/vacancies?text=${tech.name}`;

                const generalInfo = await initial(vacancyUrl);
                const {found: totalFound, pages: pagesAmount} = generalInfo;

                const vacancies = [];

                for (let i = 1; i < pagesAmount; i++) {
                    let data = await get(i, vacancyUrl);
                    vacancies.push(data);
                }

                const flat = vacancies.flatten(2);
                const frequency = frequency(flat)

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
