import './LoginPage.css';
import Card from '@mui/material/Card';


const LoginPage = () => {
    function handleLogIn(){
        
        console.log('log in button pressed');
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