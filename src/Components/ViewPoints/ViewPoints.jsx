import Button from "../Button/Button";
import {useState} from 'react';
import { PointTypes} from '../../Assets/Lists';
import "./ViewPoints.css";
import { ArrowDownward, Margin } from "@mui/icons-material";
import PointCard from "../PointCard/PointCard";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import { useEffect } from "react";

const ViewPoints = (props) => {
    const [query, setQuery] = useState("");
    const [clubMenu, setClubMenu] = useState(false);
    const setShowAddPoint=props.setShowAddPoint;
    const point = {
        title:"Dummy Point",
        description:"This point was made for dummy testing of the points card",
        start_date: "23/12/2002",
        end_date:"12/12/2002",
        category:"experience",
        proof_link: "https://www.google.com/",
        status:"D",
        visibility:"P"
    }
    function handleAddAPoint(){
        setShowAddPoint(true);
    }
    function handleQuery(e){
        setQuery(e.target.value);
    }

    const [clubs, setClubs] = useState(
        [
            {org_id: 100, name: 'Coding Club', createdAt: '2022-01-03T06:57:39.000Z', updatedAt: '2022-01-03T06:57:39.000Z', parent_org_id: null}
        ]
    );

    function fetchClubs(){
        fetch(url+"/orgs")
        .then((res)=>res.json())
            .then((result)=>{
                console.log(result);
                setClubs(result);
            }).catch((e)=>{
                console.error("Error Message is",e.message)
            });
    }

    const item=props.item;
        const setItem=props.setItem;
        function pointTypeClick(pointType){
            setItem(pointType);
            PointTypes.map((M)=>{
                if(M==pointType){
                    M.selected=true;
                } else{
                    M.selected=false;
                }
            })}
    
    useEffect(()=>{
        fetchClubs();
    },[])
    

    function toggleClubMenu(){
        setClubMenu(!clubMenu);
    }
    return ( 
        <div className="viewpoint">
            <div className="top">
                <div className="topupper">
                    <div className="addapointbutton">
                        <Button fg_color={"white"} bg_color={"#0A6ABF"} handleClick={()=>{handleAddAPoint()}} text={"Add A Point"}/>
                    </div>
                </div>
                
                <div className="toplower">
                    <div className="searchbar">
                        <form>
                            <input style={{
                                backgroundColor:"#FDFDFD",
                                borderStyle:"none",
                                borderRadius:"2.5ch",
                                minWidth: "200px",
                                minHeight:"35px",
                                textAlign:"left",
                                padding:"5px",
                                boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)"
                            }} type="text" 
                            value={query}
                            onChange={handleQuery}/>
                        </form>
                    </div>
                    <div className="redbuttons">
                        <div className="dropdown">
                            <button className="dropbtn" onClick={()=>{toggleClubMenu()}}
                            ><ArrowDownward fontSize="small"/>  Select Board</button>
                            <div className="dropdown-content">
                            {   
                                clubs.map((club)=>
                                    {
                                        return (
                                        // <div className="clubitem">
                                        //     {club.name}
                                        // </div>
                                        <a href="#">
                                            {club.name}
                                        </a>
                                    );})
                            }
                        </div>
                        </div>
                        
                        <div className="dropdown">
                            <button className="dropbtn" onClick={()=>{toggleClubMenu()}}
                            ><ArrowDownward fontSize="small"/>  Select Board</button>
                            <div className="dropdown-content">
                            {   
                                clubs.map((club)=>
                                    {
                                        return (
                                        // <div className="clubitem">
                                        //     {club.name}
                                        // </div>
                                        <a href="#">
                                            {club.name}
                                        </a>
                                    );})
                            }
                        </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div className="Selection-bar">
            {PointTypes.map((M)=>(
                    <div className={"types"+(M.selected?" selected":"")} onClick={()=> pointTypeClick(M)}>{M.title}</div>
                ))}
            </div>
            <div className="bottom">
                <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/>
            </div>
        </div>
     );
}
 
export default ViewPoints;