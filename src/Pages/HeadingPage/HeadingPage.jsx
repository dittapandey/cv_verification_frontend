import { useState } from "react";
import MenuList from '../../Assets/MenuList';
import './HeadingPage.css';
import NavBar from "../../Components/Navbar/Navbar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import ViewPoints from "../../Components/ViewPoints/ViewPoints";
import ViewPublic from "../../Components/ViewPublic/ViewPublic";
import FlaggedByYou from "../../Components/FlaggedByYou/FlaggedByYou";
import SelfFlag from "../../Components/SelfFlag/SelfFlag";
import GeneralGuidelines from "../../Components/GeneralGuidelines/GeneralGuidelines";
const HeadingPage = () => {
    const [name, setName]= useState("");
    const [item, setItem]= useState(MenuList[0]);
    function itemRender(M){
        if(M.id===1){
            return <ViewPoints/>
        }
        else if(M.id===2){
            return <ViewPublic/>
        }
        else if(M.id===3){
            return <FlaggedByYou/>
        }
        else if(M.id===4){
            return <SelfFlag/>
        }
        else if(M.id===5){
            return <GeneralGuidelines/>
        }
    }
    return ( 
        <div className="AddAPoint">
            <div className="row2">
                    <Sidemenu item={item} setItem={setItem}/>
                <div className="content">
                    {itemRender(item)}
                </div>
            </div>
        </div>
    );
}
export default HeadingPage;