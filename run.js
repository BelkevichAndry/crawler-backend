import init from './crawler'
import db from './databases/postgress-connection'
import mongodb from './databases/mongo-connection'

mongodb.then((mongoconnection) => {
    init().then(res => db.sequelize.close()).then(() => mongoconnection.disconnect())
})


