import { Close, Co2Sharp } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { CategoryList, PointTypes } from '../../Assets/Lists';
import './AddAPointCopy.css';

const PointDetails = (props) => {
    const point = props.point

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
                {/* <div id="page1">
                    <h2>What kind of Point you want to add?</h2>
                    <div className="form-content list">
                            <select value={inputs.club || " "} name="club" onChange={handleChange}>
                                {
                                    PointTypes.map((pointtype)=>{
                                        return(
                                            <option value={pointtype.title} >{pointtype.title}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-content but">
                        <button type="submit">Next</button>
                        </div>
                </div> */}
                 <div id="page2">
                    <h2>Which type of project?</h2>
                    <div className="form-content list">
                            <select value={inputs.club || " "} name="club" onChange={handleChange}>
                                {
                                    PointTypes.map((pointtype)=>{
                                        return(
                                            <option value={pointtype.title} >{pointtype.title}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-content but">
                        <button type="submit">Next</button>
                        </div>
                </div>
            </div>
        </div>
        
     );
}
 
export default PointDetails;