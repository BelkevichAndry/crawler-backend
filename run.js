
import init from './crawler'
import db from './databases/postgress-connection'
init().then(res=>db.sequelize.close())

