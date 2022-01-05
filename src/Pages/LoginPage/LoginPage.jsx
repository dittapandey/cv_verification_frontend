import './LoginPage.css';
import Card from '@mui/material/Card';

const url = "http://localhost:3000";

const LoginPage = () => {
    function handleLogIn(){
        // fetch(url+"/auth/login")
        // .then((res)=>{
        //     console.log(res);
        // }).catch((err)=>{
        //     console.log(err);
        // })
        window.open(url+"/auth/login","_self");
    }
    return ( 
        <div className="loginPage">
            <div className="title">
                Welcome to the CV verification portal!
            </div>
            <div className="subtitle">
                One stop destination for all Project verifications.
            </div>
            <div onClick={() => handleLogIn()} className="login">
                LogIn using Outlook
            </div>
        </div>
     );
}
 
export default LoginPage;