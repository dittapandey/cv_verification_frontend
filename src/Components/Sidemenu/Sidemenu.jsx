import './Sidemenu.css';
import {MenuList,AdminMenuList} from '../../Assets/Lists';
import { AppContext } from '../../App';
import {useState, useContext} from 'react';
import { useEffect } from 'react';
import { isAuthenticated } from '../../services/Auth_service';
const Sidemenu = (props) => {
    // const [item, setItem] = useState(MenuList[0]);
    const appContext = useContext(AppContext);
    const user = appContext.user;
    const item=props.item;
    const setItem=props.setItem;
    function handleClick(menuitem){
        setItem(menuitem);
        MenuList.map((M)=>{
            if(M===menuitem){
                M.selected=true;
            } else{
                M.selected=false;
            }
        })
        // console.log(menuitem);
        // console.log(MenuList);
    }
    
    return ( 
        <div className="sidemenu">
            <div className="top">
            <div className="site-name">
                    <div className="logo2">
                        <img src="iitg-logo.png" alt="" style={{height: "30px"}}/>
                    </div>
                    <div className="site-title">
                        CV VERIFICATION PORTAL
                    </div>
                </div>
                <hr id='line' />
                <div className="user">
                    WELCOME {user?user.name:"JS"}
                </div>
                <hr id='small-line' />
                <div className="upper">
                    {MenuList.map((M)=>(
                        <div className={"items"+(M.selected?" selected":"")} onClick={()=> handleClick(M)}>{M.title}</div>
                    ))}
                </div>
                <hr id='line' />
             <div className="user">
                 ADMIN CONTROLS
             </div>
             <hr id='small-line' />
             <div className="upper">
                {AdminMenuList.map((M)=>(
                    <div className={"items"+(M.selected?" selected":"")} onClick={()=> handleClick(M)}>{M.title}</div>
                ))}
            </div>

            </div>
            
            
            <div className="lower">
                <p>Faqs</p>
                <p>Contact us</p>
            </div>
        
        </div>
     );
}
 
export default Sidemenu;