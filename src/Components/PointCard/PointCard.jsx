import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import './PointCard.css';
import { full } from '../../Assets/FullForm';

const PointCard = (props) => {
    const point = props.point;
    const flagmenu = props.flagmenu;
    const [flag,setFlag]=useState(false);
    function handleFlagMenu(e){
        e.preventDefault();
        setFlag(!flag);
        console.log(flag)
    }
    return ( 
        <div className={"card "+(point.status)}>
            <div className="logo p1">
                <img style={{width:"100px"}} src="cc_logo.png" alt="coding club logo"/>
            </div>
            <div className="col p2">
                <div className="row">
                    <div className="text-left" style={{fontSize:"25px", fontWeight:"bold"}}>
                        {point.title}
                    </div>
                    <div className="duration">
                        Duration: {point.start_date} to {point.end_date}
                    </div>
                </div>
                <div className="row text-left">
                Description : {point.description}
                </div>
                <div className="row">
                    <div className="proof-link">
                        <a href={point.proof_link}>Link for the proof</a>
                    </div>
                    <div className={"approval-status "+point.status+"a"}>
                        Approval Status : {full[point.status]}
                    </div>
                </div>
            </div>
            {flagmenu && <div className="p4">
                <div className="flag-menu" onClick={(e)=>{handleFlagMenu(e)}}>
                    <MoreVert/>
                </div>
                {flag && <div className="flag-menu-window">
                    Ask what to fill here
                </div>}
            </div>}
        </div>
    );
}
 
export default PointCard;