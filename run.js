import db from './databases/mongo-connection'
import init from './crawler'

 db.then(res=>{
    return init().then(()=>  res.disconnect());
});
