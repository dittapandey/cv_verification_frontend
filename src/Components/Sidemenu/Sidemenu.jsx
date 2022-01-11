import './Sidemenu.css';
import MenuList from '../../Assets/MenuList';
import AdminMenuList from '../../Assets/AdminMenuList';
import {useState} from 'react';
import { useEffect } from 'react';
const Sidemenu = (props) => {
    // const [item, setItem] = useState(MenuList[0]);
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
            WELCOME JOHN SMITH
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
            
            <div className="lower">
                <p>Faqs</p>
                <p>Contact us</p>
            </div>
        
        </div>
     );
}
 
export default Sidemenu;