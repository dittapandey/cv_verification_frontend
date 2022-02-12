import { useState } from "react";
import {BACKEND_URL as url } from "../../Assets/FullForm";
import "./ViewRequests.css";
import { useEffect } from "react";

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
      status:""
    }
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
  useEffect(()=>{
    fetchRequests();
  },[])

  return (
    // <div>hello</div>
    <Stack>
      <Typography variant="h4">Requests for approval</Typography>
      <Divider sx={{ borderBottomWidth: 5 }} />
      <Box overflow="auto" sx={{ height: "50vh", marginBottom: "1vmax" }}>
        <div className="approvals">
          {requestData.map((student) => {
              return(
              <ApprovalPoints request={student}/>
            )
          })}
          {/* {rawData.map((point, index) => (
              <Accordion
                expanded={expanded === "panel" + (index + 1).toString()}
                onChange={handleExpanded("panel" + (index + 1).toString())}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {point.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {point.category.replace("$", " ")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Point Description: {point.description}</Typography>
                  <Typography>User Email ID: {point.user_id}</Typography>
                  <Box sx={{ height: "20px" }}></Box>
                  <Box>
                    <Button
                      sx={{ display: "inline", margin: "5px" }}
                      variant="contained"
                    >
                      Approve Request
                    </Button>
                    <Button
                      sx={{ display: "inline", margin: "5px" }}
                      variant="contained"
                    >
                      Deny Request
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))} */}

          {/* <Accordion expanded={expanded === 'panel2'} onChange={handleExpanded('panel2')}>
                        <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            You are currently not an owner
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                            laoreet.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleExpanded('panel3')}>
                        <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Advanced settings
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Filtering has been entirely disabled for whole web server
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                            amet egestas eros, vitae egestas augue. Duis vel est augue.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleExpanded('panel4')}>
                        <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                            amet egestas eros, vitae egestas augue. Duis vel est augue.
                        </Typography>
                        </AccordionDetails>
                    </Accordion> */}
        </div>
      </Box>
      <Typography variant="h4">Flagged Points</Typography>
      <Divider sx={{ borderBottomWidth: 5, color: "black" }} />
      <Box overflow="auto" sx={{ height: "50vh", marginTop: "1vmax" }}>
        <div className="approvals">
          {requestData.map((student) => (
            <FlaggedPoints student={student} />
          ))}
        </div>
      </Box>
      <Divider />
    </Stack>
  );
};

export default ViewRequest;
