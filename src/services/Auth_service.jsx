import {BACKEND_URL as url} from '../Assets/FullForm';
import axios from "axios";
import { useState } from 'react';

var user;

function isAuthenticated(){
    // let user=null;
    // fetch(url+'/auth/status',{
    //         headers: {
    //             "Access-Control-Allow-Origin": "http://localhost:3000",
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Credentials": "true",
    //             "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //             "Access-Control-Allow-Headers":
    //                 "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    //         }
    // })
    // .then(res=>res.json())
    // .then((response)=>console.log(response));
    axios.get(url+"/auth/status", {
        withCredentials:true,
        headers:{
            
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
    })
    .then((res)=>{
        if(res.data.user){
            console.log(res.data.user)
            user=res.data.user;
            return res.data.user;
        } else {
            console.log("User data not received");
            return null;
        }
    })
    // fetch(url+'/auth/status',{
    //     method:'POST',
    //     credentials: "include",
    //     mode:"no-cors"
    // }).then((res)=>{res.text()})
    // .then((response)=>{console.log(response)})
    // .catch((error)=>{console.error(error.message)});
}

export {isAuthenticated, user};
