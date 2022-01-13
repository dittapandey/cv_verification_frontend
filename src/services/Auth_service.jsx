import {BACKEND_URL as url} from '../Assets/FullForm';

function isAuthenticated(){
    fetch(url+'/auth/status',{
        credentials:'include',
        headers:{
            Access_Allow
        }
    })
    .then(res=>res.json())
    .then((response)=>console.log(response));
}

export {isAuthenticated};