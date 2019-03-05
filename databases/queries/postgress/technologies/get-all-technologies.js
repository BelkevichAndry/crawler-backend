import db from "../../../postgress-connection";


export default function(){
   return db.Technologies.findAll({attributes:['name'], raw: true}).then(res=> res);
}
