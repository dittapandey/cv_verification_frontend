import { Close, Co2Sharp } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { CategoryList } from '../../Assets/Lists';
import './AddAPoint.css';
import { BACKEND_URL as url } from '../../Assets/FullForm';
import { isAuthenticated } from '../../services/Auth_service';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AddAPoint = (props) => {
    const setShowAddPoint = props.setShowAddPoint;
    const [inputs, setInputs] = useState({});
    const [page, setPage]= useState(1);
    const [currentCategory, setCurrentCategory] = useState()
    const [categoryId, setCategoryId] = useState(1);
    const [clubId, setClubId] = useState(0);
    // const [fade,setFade] = 
    // const [closeButtonColor, setCloseButtonColor] = useState("disabled");

    function renderFormPage(page){
        if(page===1){
            return(
                <div className="content_page p1">
                            <h2>
                                What type of CV Point do you wish to add?
                            </h2>
                            <FormControl sx={{width: "70%", m:"2",marginTop:"45px"}}>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                name="category"
                                value={inputs.category || " "}
                                label="category"
                                onChange={handleChange}
                            >
                                {
                                    CategoryList["categories"].map((category)=>{
                                        return(
                                            <MenuItem value={category.title}>{category.title}</MenuItem>
                                        );
                                    })
                                }
                                {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                            </FormControl>
                        </div>
            );
        } else if(page===2){
            return(
                <div className="content_page p1">
                            <h2>
                                What type of {currentCatego} do you wish to add?
                            </h2>
                            <FormControl sx={{width: "70%", m:"2",marginTop:"45px"}}>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                name="category"
                                value={inputs.category || " "}
                                label="category"
                                onChange={handleChange}
                            >
                                {
                                    CategoryList["categories"].map((category)=>{
                                        return(
                                            <MenuItem value={category.title}>{category.title}</MenuItem>
                                        );
                                    })
                                }
                                {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                            </FormControl>
                        </div>
            );
        }
    }


    function getClubId(club){
        console.log(club);
        setClubId(club.org_id);
    }
    function closeAddPoint(){
        setShowAddPoint(false);
    }
    function handleSubmit(event){
        event.preventDefault()
        isAuthenticated();
        console.log(inputs);
        fetch(url+'/points',{
            method:'POST',
            body:JSON.stringify(inputs),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept":"application/json"
            },
            credentials: "include",
            mode:"no-cors"
        }).then((res)=>{res.text()})
        .then((response)=>{console.log(response)})
        .catch((error)=>{console.error(error.message)});
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(name==="category"){
            setCategoryId(CategoryList["hash"][value]);
        }
        setInputs(values => ({...values, [name]: value}))
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
                // console.log(result);
                setClubs(result);
            }).catch((e)=>{
                console.error("Error Message is",e.message)
            });
    }
    
    useEffect(()=>{
        fetchClubs();
    },[])

    return ( 
        <div className="page">
            <div className="addapoint">
                <div className="close"
                // onMouseEnter={setCloseButtonColor("primary")} 
                // onMouseLeave={setCloseButtonColor("disabled")}
                onClick={()=>{closeAddPoint()}}
                >
                    <Close color="disabled"sx={{fontSize:"30px"}}
                        />
                </div>
                {/* <div className="form_">
                    <div className="heading">
                        Add Points To your CV
                    </div>
                    <form onSubmit={(event)=>{handleSubmit(event)}}>
                        <div className="form-content">
                            <label>
                                <h4>Project Title:   </h4>
                                <input type="text" name="title" value={inputs.title || " "} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="form-content ">
                            <label>
                                <h4>Description:    </h4>
                                <input type="text" name="description" value={inputs.description || " "} onChange={handleChange}/>
                            </label>
                        </div>
                        <div className="form-content list">
                            <h4>Point Category:</h4>
                            <select value={inputs.category || " "} name="category"  onChange={handleChange}>
                                {
                                    CategoryList["categories"].map((category)=>{
                                        // console.log(category);
                                        return(
                                            <option value={category.title}>{category.title}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-content list">
                            <h4>Point Sub-Category:</h4>
                            <select value={inputs.sub_category || " "} name="sub_category"  onChange={handleChange}>
                                {
                                    CategoryList["categories"][categoryId-1].sub_category.map((category)=>{
                                        return(
                                            <option value={category.title}>{category.title}</option>
                                        );
                                    })
                                }
                                
                            </select>

                        </div>
                        <div className="form-content">
                            <label>
                                <h4>Proof Link:   </h4>
                                <input type="text" name="proof_link" value={inputs.proof_link || " "} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="form-content list">
                            <h4>
                                Club:
                            </h4>
                            <select value={inputs.club || " "} name="club" onChange={handleChange}>
                                {
                                    clubs.map((club)=>{
                                        return(
                                            <option value={club.name} >{club.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-content ">
                            <label>
                                <h4>Start-Date:    </h4>
                                <input type="text" name="start_date" value={inputs.start_date || " "} onChange={handleChange}/>
                            </label>
                        </div>
                        <div className="form-content ">
                            <label>
                                <h4>End-Date :   </h4>
                                <input type="text" name="end_date" value={inputs.end_date || " "} onChange={handleChange}/>
                            </label>
                        </div>
                        <div className="form-content but">
                        <button type="submit">Post Verification Request</button>
                        </div>
                        
                    </form>
                </div> */}
                <div className="form_page">
                    <div className="content">
                        {renderFormPage(page)}
                    </div>
                    <div className="control">
                        <Button variant="contained">Prev</Button>{'\t\t'}
                        <Button variant="contained">Next</Button>
                    </div>
                </div>
            </div>
        </div>
        
     );
}
 
export default AddAPoint;