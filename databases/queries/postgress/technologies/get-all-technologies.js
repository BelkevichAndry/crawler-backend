import db from "../../../postgress-connection";


export default function(){
   return db.Technologies.findAll().then(res=> res);
}
