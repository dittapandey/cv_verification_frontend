import { useState } from "react";
import {BACKEND_URL as url } from "../../Assets/FullForm";
import "./ViewRequests.css";
import { useEffect, createContext } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ExpandMore } from "@mui/icons-material";
import { useContext } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import ApprovalPoints from "./ApprovalPoints";
import FlaggedPoints from "./FlaggedPoints";

export const RequestContext = createContext();

// Point: {point_id: 104, description: 'fsiubfdsufbsduf', title: 'efdsndjfsndfj', category: 'Projects$Personal Project', start_date: null, …}
// createdAt: "2022-02-10T10:49:50.000Z"
// description: null
// flag_id: 100
// flagged_by: "aditya.pandey@iitg.ac.in"
// point_id: 104
// response_by: null
// status: "P"
// updatedAt: "2022-02-10T10:49:50.000Z"

const ViewRequest = () => {
  const appContext = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  //   const [rawData, setRawData] = appContext.rawData;
  const [requestData, setRequestData] = useState([{
    type:"",
    User:{
      name:"",
      roll_no:"",
      branch:""
    },
    Point:{
      title:"",
      description:"",
      status:"",
      category:"$"
    }
  }]);

  const [flagData, setFlagData] = useState([{
    Point: {
      point_id: 0,
      description: "",
      title: "",
      category: "$",
      user_id:"",
    },
    description:"",
    flag_id: 0,
    flagged_by: "",
    status: ""
  }]);

  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const rawData = [
    {
      title: "Title",
      description: "Description",
      category: "dummy$project",
      user_id: "2001111111111",
    },
    {
      title: "Title",
      description: "Description",
      category: "dummy$project",
      user_id: "2001111111111",
    },
  ];

  const students1 = [
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Project",
      status: "Approved",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy Project",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description:
        "Hello this is my project description and a test case for limiting the characters upto three lines so that when hovered over , we can see the full description written by the student as a hover and popup element and also to learn something new and complete this project as soon as possible",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Approved",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Project",
      status: "Approved",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy Project",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Approved",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Project",
      status: "Approved",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy Project",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Approved",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
  ];
  const students2 = [
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Project",
      status: "Flagged",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy Project",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Flagged",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Flagged",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Flagged",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Flagged",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
    {
      name: "Parshva",
      rollno: "20000000",
      request: "Position Of Responsibility",
      status: "Flagged",
      programme: "Btech 2nd Year",
      branch: "cse",
      requesttitle: "Dummy POR",
      duration: "21/12/2021 - 21/2/2022",
      prooflink: "www.google.com",
      description: "Hello this is my project description",
    },
  ];

  const fetchRequests =  async()=>{
    axios.get(url+"/requests/pending", {
      withCredentials:true,
      headers:{
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
      }
  }). then((res)=>{
    console.log(res,"this is the request response");
    if(res.data){
      setRequestData(res.data);
    }
  })
  }

  const loadFlagData = () => {
    console.log(appContext.apiData.pendingFlagsOfAdmin)
    setFlagData(appContext.apiData.pendingFlagsOfAdmin)
  }

  const onStart = async () => {
    fetchRequests();
    appContext.fetchApiData();
    loadFlagData();
  }
  useEffect(()=>{
    onStart();
    
  },[])

  return (
    <RequestContext.Provider 
    value={{
      fetchRequests:fetchRequests,
      onStart: onStart,
    }}>
    <Stack>
      <Typography variant="h4">Requests for approval ({requestData.length})</Typography>
      <Divider sx={{ borderBottomWidth: 5 }} />
      <Box overflow="auto" sx={{ height: "50vh", marginBottom: "1vmax" }}>
        <div className="approvals">
          {requestData.map((student) => {
              return(
              <ApprovalPoints request={student}/>
            )
          })}
        </div>
      </Box>
      <Typography variant="h4">Flagged Points ({flagData.length})</Typography>
      <Divider sx={{ borderBottomWidth: 5, color: "black" }} />
      <Box overflow="auto" sx={{ height: "50vh", marginTop: "1vmax" }}>
        <div className="approvals">
          {flagData.map((flag) => (
            <FlaggedPoints flag={flag} />
          ))}
        </div>
      </Box>
      <Divider />
    </Stack>
    </RequestContext.Provider>
  );
};

export default ViewRequest;
