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
            <div className='instiName'>
                <div className="logo">
                    <img src="IITG_logo2.png" alt="" style={{height: "50px"}}/>
                </div>
                <div className="title">
                    CV VERIFICATION PORTAL
                </div>
            </div>
            <div className="subtitle">
                Your one stop destination for all Project verifications.
            </div>
            <div onClick={() => handleLogIn()} className="login">
                LogIn using Outlook
            </div>
            <div className="ContactUs">
                <p id='l' style={{fontWeight: "bold"}}>For Queries Contact us at</p>
                <p id='l'>abc@iitg.ac.in</p>
                <p id='l'>+91 99999 99999</p>
            </div>
        </div>
     );
}
 
export default LoginPage;