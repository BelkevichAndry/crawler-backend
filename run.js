import db from './models/connection'
import init from './crawler'


db.then(res=>{
    init().then(()=>{
        res.disconnect()
    })
});