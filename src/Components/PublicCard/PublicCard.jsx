import { useState } from 'react';
import PointCard from '../PointCard/PointCard.jsx';
import './PublicCard.css';
const PublicCard = (props) => {
    const point = props.point;
    const [privCard, setPrivCard] = useState(false);
    function handleCardClick(e){
        e.preventDefault();
        setPrivCard(!privCard);
    }
    const full = {
        "P" : "Pending",
        "A" : "Approved",
        "D" : "Denied"
    }
    return (
        <div className="wrap">
            {point.visibility==="P" && <div className={"card "+(point.status)} onClick={(e)=>{handleCardClick(e)}}>
                <div className="col p1">
                    <img style={{width:"50px"}} src="cc_logo.png" alt="coding club logo"/>
                </div>
                <div className="col p2">
                    <div className="row p1 text-left" style={{fontSize:"20px", fontWeight:"bold"}}>
                        {point.title}
                    </div>
                    {/* <div className="row p2 text-left">
                        Started On: {point.start_date}
                    </div>
                    <div className="row p3 text-left">
                        Started On: {point.end_date}
                    </div> */}
                </div>
                <div className="col p3">
                    {/* <div className="row p1 text-left" style={{fontSize:"22px", fontWeight:"bold"}}>
                        Description
                    </div>
                    {point.description} */}
                    <div className="row p2 text-left">
                        Started On: {point.start_date}
                    </div>
                </div>
                <div className="col p4">
                    Approval Status: {full[point.status]}
                </div>
            </div>}
            {privCard && <PointCard point={point} flagmenu={true}/>}
        </div> 
        
     );
}
 
export default PublicCard;