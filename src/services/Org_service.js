import {BACKEND_URL as url} from '../Assets/FullForm';

function fetchOrg(){
    fetch(url+'/orgs')
    .then(res=>res.json())
    .then((response)=>{
        console.log(response.body);
    })
}
function orgToOrg_id(orgs){
    var hash = new Object();
    orgs.map((org)=>{
        hash[org.name]=org.org_id;
    })
    return hash;
}

export {orgToOrg_id};