import {BACKEND_URL as url} from '../Assets/FullForm';

function isAuthenticated(){
    fetch(url+'/auth/status')
    .then(res=>res.json())
    .then((response)=>console.log(response));
}

export {isAuthenticated};