import './PointCard.css'

const PointCard = (props) => {
    const point = props.point;
    return ( 
        <div className={"card "+(point.status)}>
            <div className="col p1">
                <img style={{width:"100px"}} src="cc_logo.png" alt="coding club logo"/>
            </div>
            <div className="col p2">
                <div className="row p1 text-left" style={{fontSize:"30px", fontWeight:"bolder"}}>
                    {point.title}
                </div>
                <div className="row p2 text-left">
                    Started On: {point.start_date}
                </div>
                <div className="row p3 text-left">
                    Started On: {point.end_date}
                </div>
            </div>
            <div className="col p3">
                <div className="row p1 text-left" style={{fontSize:"22px", fontWeight:"bold"}}>
                    Description
                </div>
                {point.description}
            </div>
            <div className="col p4">
                
            </div>
        </div>
    );
}
 
export default PointCard;