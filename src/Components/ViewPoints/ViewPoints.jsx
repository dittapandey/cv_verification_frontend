import Button from "../Button/Button";
import {useState} from 'react';
import "./ViewPoints.css";
import { ArrowDownward, Margin } from "@mui/icons-material";
import PointCard from "../PointCard/PointCard";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { CategoryList } from "../../Assets/Lists";

const ViewPoints = (props) => {
    const appContext = useContext(AppContext);
    const [query, setQuery] = useState("");
    const [clubMenu, setClubMenu] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(CategoryList["categories"][0]);
    const [rawData, setRawData] = useState([{}]);
    const [categoryData, setCategoryData] = appContext.categoryData;
    const setShowAddPoint=props.setShowAddPoint;
    function handleAddAPoint(){
        setShowAddPoint(true);
    }
    function handleQuery(e){
        setQuery(e.target.value);
    }

    const [clubs, setClubs] =appContext.clubs;

    // function fetchClubs(){
    //     fetch(url+"/orgs")
    //     .then((res)=>res.json())
    //         .then((result)=>{
    //             console.log(result);
    //             setClubs(result);
    //         }).catch((e)=>{
    //             console.error("Error Message is",e.message)
    //         });
    // }

    

    

    function categoryChange(_category){
        setCurrentCategory(_category)
        CategoryList["categories"].map((category)=>{
            if(category.title===_category){
                category.selected=true;
            } else {
                category.selected=false;
            }
        })
    }

    function toggleClubMenu(){
        setClubMenu(!clubMenu);
    }

    useEffect(()=>{
        appContext.fetchRawData();
    },[])

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
            <div className="Selection-bar middle">
                {/* <button type="button">Experience</button>
                <button type="button">Projects</button>
                <button type="button">Courses</button>
                <button type="button">Positions of Responsibility</button>
                <button type="button">Achievements</button>
                <button type="button">Extracurriculars</button> */}
                {
                    CategoryList["categories"].map((category)=>{
                        return(<button type="button" onClick={()=>{categoryChange(category)}}>{category.title}</button>);
                    })
                }
            </div>
            <div className="bottom">
                {/* <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/>
                <PointCard point={point} flagmenu={false}/> */}
                {/* {currentCategory.title} */}
                {currentCategory.sub_category.map((sub_category)=>{
                    return(
                        <div className="sub_category">
                            {sub_category.title}
                            {JSON.stringify(categoryData["categories"][currentCategory.id-1].sub_category[sub_category.id%10 -1]["data"])}
                            {/* {categoryData["categories"][currentCategory.id-1].sub_category[sub_category.id%10 -1]["data"].map((point)=>{
                                return(
                                    <PointCard point={point} flagmenu={false}/>
                                );
                            })} */}
                        </div>
                    )
                })}
                
            </div>
        </div>
     );
}
 
export default ViewPoints;