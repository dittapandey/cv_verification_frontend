import React from "react";
import Popover from "@mui/material/Popover";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";

const Points = ({ student }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "5px",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { description } = student;

  let descriptionslice = description.slice(0, 155);
  if (description.length > 155) {
    descriptionslice = `${descriptionslice}....`;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openpop = Boolean(anchorEl);
  return (
    <>
      <div
        className="pointofapproval"
        style={{
          backgroundColor:
            student.status === "Approved" ? "#a5d6a7" : "#E57373",
        }}
      >
        <div className="approvalinfo">
          <h4>
            {student.name} ({student.rollno})
          </h4>
          <h4>
            <span>Requested for</span> {student.request} <span>approval</span>
          </h4>
        </div>
        <div className="approvalbutton">
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
            <div className="requestdetails">
              <h4>
                Student Name : <span>{student.name}</span>
              </h4>
              <h4>
                Roll No : <span>{student.rollno}</span>
              </h4>
              <h4>
                Programme : <span>{student.programme}</span>
              </h4>
              <h4>
                Branch : <span>{student.branch}</span>
              </h4>
              <h4>
                Point Type : <span>{student.request}</span>
              </h4>
              <h4>
                Point Title : <span>{student.requesttitle}</span>
              </h4>
              <h4>
                Duration : <span>{student.duration}</span>
              </h4>
              <h4>
                Proof link : <a href="student.prooflink">{student.prooflink}</a>
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
                    <span className="descriptionhover">{descriptionslice}</span>
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
                  <Typography sx={{ p: 1 }}>{student.description}</Typography>
                </Popover>
              </div>
              {/* <h4>
                Description : <span>{descriptionslice}</span>
              </h4> */}
            </div>
            <div className="requestbuttons">
              <div>
                <button type="button" onClick={handleOpen}>
                  Approve Request
                </button>
                <button type="button" onClick={handleOpen}>
                  Approve Request Using Existing Template
                </button>
              </div>
              <div>
                <button type="button" onClick={handleOpen}>
                  Approve Request And Create New Template
                </button>
                <button type="button" onClick={handleOpen}>
                  Suggest Changes
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

export default Points;
