import { Close, Co2Sharp } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { CategoryList } from "../../Assets/Lists";
import "./AddAPoint.css";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import { isAuthenticated } from "../../services/Auth_service";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AppContext } from "../../App";
import { InputGroup } from "react-bootstrap";
import axios from "axios";

const AddAPoint = (props) => {
  const appContext = useContext(AppContext);
  const setShowAddPoint = props.setShowAddPoint;
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    cat: "Projects",
    sub_category: "Personal Project",
    org_id: 0,
  });
  const [inputError, setInputError] = useState(false);
  const [page, setPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState({
    empty: true,
    sub_category: [],
  });
  const [currentsubCategory, setCurrentsubCategory] = useState({
    empty: true,
  });
  const [categoryId, setCategoryId] = useState(1);
  const [clubId, setClubId] = appContext.clubId;
  // const [fade,setFade] =
  // const [closeButtonColor, setCloseButtonColor] = useState("disabled");

  // function renderFormPage(){
  //     if(page===1){
  //         return(
  //             <div className="content_page p1">
  //                         <h2>
  //                             What type of CV Point do you wish to add?
  //                         </h2>
  //                         <FormControl sx={{width: "70%", m:"2",marginTop:"45px"}}>
  //                         <InputLabel id="category">Category</InputLabel>
  //                         <Select
  //                             labelId="category"
  //                             id="category"
  //                             name="category"
  //                             value={inputs.category || " "}
  //                             label="category"
  //                             onChange={handleChange}
  //                         >
  //                             {
  //                                 CategoryList["categories"].map((category)=>{
  //                                     console.log("category", category)
  //                                     return(
  //                                         <MenuItem sx={{zIndex:"1000001"}} value={category.title}>{category.title}</MenuItem>
  //                                     );
  //                                 })
  //                             }
  //                             {/* <MenuItem value={10}>Ten</MenuItem>
  //                             <MenuItem value={20}>Twenty</MenuItem>
  //                             <MenuItem value={30}>Thirty</MenuItem> */}
  //                         </Select>
  //                         </FormControl>
  //                     </div>
  //         );
  //     } else if(page===2){
  //             return(
  //                 <div className="content_page p2">
  //                             <h2>
  //                                 What type of {currentCategory.title} do you wish to add?
  //                             </h2>
  //                             <FormControl sx={{width: "70%", m:"2",marginTop:"45px"}}>
  //                             <InputLabel id="sub_category">Sub Category</InputLabel>
  //                             <Select
  //                                 labelId="sub_category"
  //                                 id="sub_category"
  //                                 name="sub_category"
  //                                 value={inputs.sub_category || " "}
  //                                 label="sub_category"
  //                                 onChange={handleChange}
  //                             >
  //                                 {
  //                                     currentCategory["sub_category"].map((category)=>{
  //                                         return(
  //                                             <MenuItem value={category.title}>{category.title}</MenuItem>
  //                                         );
  //                                     })
  //                                 }
  //                             </Select>
  //                             </FormControl>
  //                         </div>
  //             );
  //     } else if(page===3){
  //         return(
  //             <div className="content_page p3">
  //                 <h2>
  //                     Type in the title of your CV Point:
  //                 </h2>
  //                 <TextField
  //                 id="title"
  //                 name="title"
  //                 label="Your Point Title"
  //                 type="text"
  //                 value={inputs.title || ""}
  //                 onChange={handleChange}
  //                 // autoComplete="current-password"
  //                 sx={{marginTop:"50px"}}
  //                 />
  //             </div>
  //         );
  //     } else if(page===4){
  //         return(
  //             <div className="content_page p4">
  //                 <h2>
  //                     Type in the Description of your CV Point:
  //                 </h2>
  //                 <TextField
  //                 id="outlined-multiline-static"
  //                 name="description"
  //                 label="Your Point Description"
  //                 type="text"
  //                 placeholder='Description'
  //                 value={inputs.description || ""}
  //                 onChange={handleChange}
  //                 // autoComplete="current-password"
  //                 sx={{marginTop:"50px"}}
  //                 fullWidth
  //                 rows={5}
  //                 multiline
  //                 />
  //             </div>
  //         );
  //     }   else if(page===5){
  //         return(
  //             <div className="content_page p5">
  //                         <h2>
  //                             What type of organisation are you associated with?
  //                         </h2>
  //                         <FormControl sx={{width: "70%", m:"2",marginTop:"45px"}}>
  //                         <InputLabel id="club">Organisation</InputLabel>
  //                         <Select
  //                             labelId="club"
  //                             id="club"
  //                             name="club"
  //                             value={inputs.club || " "}
  //                             label="club"
  //                             onChange={handleChange}
  //                         >
  //                             {
  //                                 clubs.map((club)=>{
  //                                     return(
  //                                         <option value={club.name} >{club.name}</option>
  //                                     );
  //                                 })
  //                             }
  //                         </Select>
  //                         </FormControl>
  //                     </div>
  //         );
  // }
  // }
  const [title, setTitle] = useState("Project");
  function handleSubmit(event) {
    event.preventDefault();
    // authentication
    isAuthenticated();

    //inputs manipulation
    inputs["category"] = inputs.cat + "$" + inputs.sub_category;
    delete inputs.cat;
    delete inputs.sub_category;
    inputs["org_id"] = clubId[inputs.club];
    console.log("inputs", inputs);
    //checking if all the inputs are valid
    var check_inputs = true;
    if (
      inputs["title"] === "" ||
      inputs["description"] === "" ||
      inputs["org_id"] === 0
    ) {
      check_inputs = !check_inputs;
    }
    const fd  =  new FormData();
    fd.append("point", JSON.stringify(inputs));
    console.log(JSON.stringify(inputs));
    if (check_inputs) {
        axios.post(url+"/points", {
            withCredentials: true,
            body: fd,
            headers:{
              "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": `multipart/form-data; boundary=${fd._boundary}`,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
            }
          })
          .then((response) => {
            console.log(response);
            alert("Request submitted");
            setShowAddPoint(false);
          })
          .catch((error) => {
            console.error(error.message);
          });
    //   fetch(url + "/points", {
    //     method: "POST",
    //     body: {
    //         point: JSON.stringify(inputs)
    //     },
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //       Accept: "application/json",
    //     },
    //     credentials: "include",
    //     mode: "cors",
    //   })
    //     .then((res) => {
    //       res.json();
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       alert("Request submitted");
    //       setShowAddPoint(false);
    //     })
    //     .catch((error) => {
    //       console.error(error.message);
    //     });
    } else {
      alert("Check all your inputs again");
    }
  }
  function closeAddPoint() {
    setShowAddPoint(false);
  }

  const handleNext = () => {
    if (page === 1 && currentCategory.empty) {
      setInputError(true);
    } else if (page === 2 && currentsubCategory.empty) {
      setInputError(true);
    } else if (page === 3 && (!("title" in inputs) || inputs.title === "")) {
      setInputError(true);
    } else {
      setPage(page + 1);
      setInputError(false);
    }
  };
  const handlePrev = () => {
    setPage(page - 1);
  };
  // const handleChange = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     if(name==="category"){
  //         setCategoryId(CategoryList["hash"][value]);
  //         setCurrentCategory(CategoryList["categories"][CategoryList["hash"][value]-1]);
  //     } else if(name==="sub_category"){
  //         setCurrentsubCategory(value);
  //         console.log(value);
  //     }
  //     setInputs(values => ({...values, [name]: value}))
  // }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "cat") {
      setTitle(value);
      setCategoryId(CategoryList["hash"][value]);
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const [clubs, setClubs] = appContext.clubs;

  // function fetchClubs(){
  //     fetch(url+"/orgs")
  //     .then((res)=>res.json())
  //         .then((result)=>{
  //             // console.log(result);
  //             setClubs(result);
  //         }).catch((e)=>{
  //             console.error("Error Message is",e.message)
  //         });
  // }

  // useEffect(()=>{
  //     fetchClubs();
  // },[])

  return (
    <div className="page">
      <div className="addapoint">
        <div
          className="close"
          // onMouseEnter={setCloseButtonColor("primary")}
          // onMouseLeave={setCloseButtonColor("disabled")}
          onClick={() => {
            closeAddPoint();
          }}
        >
          <Close color="disabled" sx={{ fontSize: "30px" }} />
        </div>
        <div className="form_">
          <div className="heading">
            <h2>Add Points To your CV</h2>
          </div>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <div className="form_elements_3">
              <div className="dropdown_1">
                <label>
                  <h4>Point Category :</h4>
                </label>
                <select
                  value={inputs.cat || " "}
                  name="cat"
                  onChange={handleChange}
                >
                  {CategoryList["categories"].map((category) => {
                    return (
                      <option value={category.title}>{category.title}</option>
                    );
                  })}
                </select>
              </div>
              <div className="dropdown_2">
                <label>
                  <h4>Point Sub-Category :</h4>
                </label>
                <select
                  value={inputs.sub_category || " "}
                  name="sub_category"
                  onChange={handleChange}
                >
                  {CategoryList["categories"][categoryId - 1].sub_category.map(
                    (category) => {
                      return (
                        <option value={category.title}>{category.title}</option>
                      );
                    }
                  )}
                </select>
              </div>
              <div className="dropdown_3">
                <label>
                  <h4>Club :</h4>
                </label>
                <select
                  value={inputs.club || " "}
                  name="club"
                  onChange={handleChange}
                >
                  {clubs.map((club) => {
                    return <option value={club.name}>{club.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="form_elements_1">
              <div className="projecttitle">
                <label>
                  <h4>{title} Title :</h4>
                </label>
                <input
                  type="text"
                  name="title"
                  value={inputs.title || " "}
                  onChange={handleChange}
                />
              </div>
              <div className="proof_link">
                <label>
                  <h4>Proof Link :</h4>
                </label>
                <input
                  type="text"
                  name="proof_link"
                  value={inputs.proof_link || " "}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form_elements_2">
              <label>
                <h4>{title} Description :</h4>
              </label>
              <textarea
                rows="2"
                cols="91"
                name="description"
                value={inputs.description || " "}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form_elements_4">
              <div className="startdate">
                <label>
                  <h4>{title} Start Date :</h4>
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={inputs.start_date || " "}
                  onChange={handleChange}
                />
              </div>
              <div className="enddate">
                <label>
                  <h4>{title} End Date :</h4>
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={inputs.end_date || " "}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="form-content">
              <div>
                <label>
                  <h4>Project Title: </h4>
                  <input
                    type="text"
                    name="title"
                    value={inputs.title || " "}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  <h4>Description: </h4>
                  <input
                    type="text"
                    name="description"
                    value={inputs.description || " "}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div> */}
            {/* <div className="form-content list">
              <h4>Point Category:</h4>
              <select
                value={inputs.cat || " "}
                name="cat"
                onChange={handleChange}
              >
                {CategoryList["categories"].map((category) => {
                  // console.log(category);
                  return (
                    <option value={category.title}>{category.title}</option>
                  );
                })}
              </select>
            </div> */}
            {/* <div className="form-content list">
              <h4>Point Sub-Category:</h4>
              <select
                value={inputs.sub_category || " "}
                name="sub_category"
                onChange={handleChange}
              >
                {CategoryList["categories"][categoryId - 1].sub_category.map(
                  (category) => {
                    return (
                      <option value={category.title}>{category.title}</option>
                    );
                  }
                )}
              </select>
            </div> */}
            {/* <div className="form-content">
              <label>
                <h4>Proof Link: </h4>
                <input
                  type="text"
                  name="proof_link"
                  value={inputs.proof_link || " "}
                  onChange={handleChange}
                />
              </label>
            </div> */}
            {/* <div className="form-content list">
              <h4>Club:</h4>
              <select
                value={inputs.club || " "}
                name="club"
                onChange={handleChange}
              >
                {clubs.map((club) => {
                  return <option value={club.name}>{club.name}</option>;
                })}
              </select>
            </div> */}
            {/* <div className="form-content ">
              <label>
                <h4>Start-Date: </h4>
                <input
                  type="text"
                  name="start_date"
                  value={inputs.start_date || " "}
                  onChange={handleChange}
                />
              </label>
            </div> */}
            {/* <div className="form-content ">
              <label>
                <h4>End-Date : </h4>
                <input
                  type="text"
                  name="end_date"
                  value={inputs.end_date || " "}
                  onChange={handleChange}
                />
              </label>
            </div> */}
            <div className="form_elements_5 ">
              <button type="submit">Post Verification Request</button>
            </div>
          </form>
        </div>
        {/* <div className="form_page">
                    <div className="content">
                        {renderFormPage()}
                    </div>
                    {inputError&& <div className="error">
                        <Alert severity='error'>Input not correct</Alert>
                    </div>}
                    <div className="control">
                        <Button variant="contained" onClick={()=>handlePrev()}>Prev</Button>{'\t\t'}
                        <Button variant="contained" onClick={()=>handleNext()}>Next</Button>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default AddAPoint;
