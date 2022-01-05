import Button from "../Button/Button";
import {useState} from 'react';
import "./ViewPublic.css";
import { ArrowDownward, Margin } from "@mui/icons-material";
import PublicCard from "../PublicCard/PublicCard";

const ViewPublic = () => {
    const [query, setQuery] = useState("");
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
        console.log("Add A Point Button Clicked");
    }
    function handleQuery(e){
        setQuery(e.target.value);
    }
    return ( 
        <div className="viewpoint">
            <div className="top">
                <div className="topupper">
                    <div className="addapointbutton">
                        <Button fg_color={"white"} bg_color={"#0A6ABF"} handleClick={handleAddAPoint} text={"Add A Point"}/>
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
                                
                            }} type="text" 
                            value={query}
                            onChange={handleQuery}/>
                        </form>
                    </div>
                    <div className="redbuttons">
                        <div className="redbutton">
                            <button style={{
                                backgroundColor:"#A60303",
                                color:"white",
                                borderStyle:"none",
                                borderRadius:"1ch",
                                alignContent:"center",
                                Margin:"15px"                    
                            }}><ArrowDownward fontSize="small"/>Select Board</button>
                        </div>
                        <div className="redbutton">
                        <button style={{
                            backgroundColor:"#A60303",
                            color:"white",
                            borderStyle:"none",
                            borderRadius:"1ch",
                            alignContent:"center",
                            Margin:"15px",
                            
                        }}><ArrowDownward fontSize="small"/>Select Club</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div className="middle">
                middle
            </div>
            <div className="bottom">
                <PublicCard point={point}/>
                <PublicCard point={point}/>
                <PublicCard point={point}/>
                <PublicCard point={point}/>
                <PublicCard point={point}/>
            </div>
        </div>
     );
}
 
export default ViewPublic;