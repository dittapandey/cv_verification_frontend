import './Sidemenu.css';
import MenuList from '../../Assets/MenuList';
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
            <div className="upper">
                {MenuList.map((M)=>(
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