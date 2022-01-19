import { useState } from "react";
import {MenuList, PointTypes} from '../../Assets/Lists';
import './HeadingPageCopy.css';
import NavBar from "../../Components/Navbar/Navbar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import ViewPoints from "../../Components/ViewPoints/ViewPoints";
import ViewPublic from "../../Components/ViewPublic/ViewPublic";
import FlaggedByYou from "../../Components/FlaggedByYou/FlaggedByYou";
import SelfFlag from "../../Components/SelfFlag/SelfFlag";
import GeneralGuidelines from "../../Components/GeneralGuidelines/GeneralGuidelines";
import AddAPointCopy from "../../Components/AddAPoint copy/AddAPointCopy";
const HeadingPageCopy = () => {
    const [name, setName]= useState("");
    const [item, setItem]= useState(MenuList[0]);
    const [showAddPoint, setShowAddPoint] = useState(false);

    function itemRender(M){
        if(M.id===1){
            return <ViewPoints setShowAddPoint={setShowAddPoint}/>
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

        
            // cons
    }
    return ( 
        <div className="AddAPoint">
            {showAddPoint && <AddAPointCopy setShowAddPoint={setShowAddPoint}/>}
            <div className="row2">
                    <Sidemenu item={item} setItem={setItem}/>
                <div className="content">
                    {itemRender(item)}
                </div>
            </div>
        </div>
    );
}
export default HeadingPageCopy;