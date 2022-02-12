import React from "react";
import Popover from "@mui/material/Popover";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import { BACKEND_URL as url} from "../../Assets/FullForm";
import { RequestContext } from "./ViewRequests";

const FlaggedPoints = (props) => {
  const requestContext = React.useContext(RequestContext);
  let flag = {
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
  }
  if(props.flag){
    flag=props.flag;
    if(!flag.description){
      delete flag.description
      flag["description"] = "";
    }
  }

  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    borderRadius: "5px",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [user,setUser] = React.useState({
    name:"",
    description:"",
    roll_no:"",
    branch:""
  });
  const [flagger, setFlagger] = React.useState({
    name:"",
    description:"",
    roll_no:"",
    branch:""
  });
  const [category, sub_category] = flag.Point.category.split('$');

  const fetchUserDetails = async() => {
    
    const res = await fetch(url + `/user/find/${flag.Point.user_id}`,{credentials:"include"});
    
    const response = await res.json();
    console.log(response);
    if(res.status===200){
      setUser(response)
      // console.log(response)
    }

    const res1 = await fetch(url + `/user/find/${flag.flagged_by}`,{credentials:"include"});
    const response1 = await res1.json();
    if(res1.status === 200) {
      setFlagger(response1)
      // console.log(response1)
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { description } = flag.Point;
  let flagDescription = flag.description;

  let descriptionslice = description.slice(0, 155);
  if (description.length > 155) {
    descriptionslice = `${descriptionslice}....`;
  }

  let flagDescriptionSlice = flagDescription.slice(0,155);
  if(flagDescription.length > 155) {
    flagDescriptionSlice = `${flagDescriptionSlice}`
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const acceptFlag = async ()=>{
    const res = await fetch(url+`/flag/accept/${flag.flag_id}`,{method:"POST", credentials:"include"});
    const response = await res.json();
    if(res.status === 200){
      alert(response);
    }
    handleClose();
    requestContext.onStart();
  }

  const denyFlag = async ()=>{
    const res = await fetch(url+`/flag/decline/${flag.flag_id}`,{method:"POST", credentials:"include"});
    // console.log(res);
    const response = await res.json();
    if(res.status === 200){
      alert(response);
    }
    handleClose();
    requestContext.onStart();
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openpop = Boolean(anchorEl);

  React.useEffect(()=>{fetchUserDetails()},[])
  return (
    <>
      <div
        className="pointofapproval"
        style={{
          backgroundColor: "#E57373",
        }}
      >
        <div className="approvalinfo">
          <h4>
            {user.name} ({user.roll_no})
          </h4>
          <h4>
            <span>Requested for</span> {category} <span>approval</span>
          </h4>
        </div>
        <div className="flaggedbutton">
          <button type="button" onClick={handleOpen}>
            View Request
          </button>
        </div>
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              className="requesttitle"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Request Details
            </Typography>
            <div className="flag">
              <div className="requestinfo">
                <div className="requestinfoheading">Request Details</div>
                {/* <Typography
                  className="requesttitle"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Request Details
                </Typography> */}
                <h4>
                  Student Name : <span>{user.name}</span>
                </h4>
                <h4>
                  Roll No : <span>{user.rollno}</span>
                </h4>
                <h4>
                  Branch : <span>{user.branch}</span>
                </h4>
                <h4>
                  Point Type : <span>{category}</span>
                </h4>
                <h4>
                  Point Title : <span>{flag.Point.title}</span>
                </h4>
                <h4>
                  Proof link :{" "}
                  <a href="student.prooflink">{flag.Point.proof_link}</a>
                </h4>
                <div>
                  <Typography
                    aria-owns={openpop ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <h4 className="descriptiontitle">
                      Description :{" "}
                      <span className="descriptionhover">
                        {descriptionslice}
                      </span>
                    </h4>
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                      width: "70%",
                    }}
                    open={openpop}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{ p: 1 }}>{flag.Point>description}</Typography>
                  </Popover>
                </div>
                {/* <h4>
                Description : <span>{descriptionslice}</span>
              </h4> */}
              </div>
              <div className="flagdetails">
                <div className="requestinfoheading">Flag Details</div>
                <h4>
                  Flagged By : <span>{flag.flagged_by} </span>
                </h4>
                <h4>
                  Roll No : <span>{flagger.roll_no}</span>
                </h4>
                <h4>
                  Branch : <span>{flagger.branch}</span>
                </h4>
                <div>
                  <Typography
                    aria-owns={openpop ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <h4 className="descriptiontitle">
                      Flag Description :{" "}
                      <span className="descriptionhover">
                        {flagDescriptionSlice}
                      </span>
                    </h4>
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                      width: "70%",
                    }}
                    open={openpop}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{ p: 1 }}>{flag.description}</Typography>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="flagbuttons">
              <div>
                <button type="button" className="button1" onClick={()=>{acceptFlag()}}>
                  Accept Flag
                </button>
                <button type="button" className="button3" onClick={()=>{denyFlag()}}>
                  Decline Flag
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div> */}
    </>
  );
};

export default FlaggedPoints;
