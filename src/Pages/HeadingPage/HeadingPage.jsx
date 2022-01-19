import { useState } from "react";
import {MenuList} from '../../Assets/Lists';
import './HeadingPage.css';
import NavBar from "../../Components/Navbar/Navbar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import ViewPoints from "../../Components/ViewPoints/ViewPoints";
import ViewPublic from "../../Components/ViewPublic/ViewPublic";
import FlaggedByYou from "../../Components/FlaggedByYou/FlaggedByYou";
import SelfFlag from "../../Components/SelfFlag/SelfFlag";
import GeneralGuidelines from "../../Components/GeneralGuidelines/GeneralGuidelines";
import AddAPoint from "../../Components/AddAPoint/AddAPoint";
import WorkInProgress from "../../Components/WorkInProgress/WorkInProgress";
import ViewRequest from "../../Components/ViewRequests/ViewRequests";
import FlagApprovals from "../../Components/FlagApprovals/FlagApprovals";
const HeadingPage = () => {
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
        } else if(M.id==6){
            return <WorkInProgress/>
        } else if(M.id == 7){
            return <ViewRequest/>
        } else if(M.id == 8){
            return <WorkInProgress/>
        } else if(M.id == 9){
            return <FlagApprovals/>
        } else if(M.id==10){
            return <GeneralGuidelines/>
        }
    }
    return ( 
        <div className="AddAPoint">
            {showAddPoint && <AddAPoint setShowAddPoint={setShowAddPoint}/>}
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