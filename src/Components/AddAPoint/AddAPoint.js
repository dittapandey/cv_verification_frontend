import { Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { CategoryList } from '../../Assets/Lists';
import './AddAPoint.css';
import { BACKEND_URL as url } from '../../Assets/FullForm';

const AddAPoint = (props) => {
    const setShowAddPoint = props.setShowAddPoint;
    const [inputs, setInputs] = useState({});
    // const [fade,setFade] = 
    // const [closeButtonColor, setCloseButtonColor] = useState("disabled");
    function closeAddPoint(){
        setShowAddPoint(false);
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs)
        alert(inputs);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
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
                <div className="form_">
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
                            <h4>Project Category:</h4>
                            <select value={inputs.category || " "} name="category"  onChange={handleChange}>
                                {
                                    CategoryList.map((category)=>{
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
                            <select value={inputs.clubs || " "} name="clubs"  onChange={handleChange}>
                                {
                                    clubs.map((club)=>{
                                        return(
                                            <option value={club.name}>{club.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-content but">
                        <button type="submit">Post Verification Request</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
        
     );
}
 
export default AddAPoint;