import React from "react";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import "./PointCard.css";
import { full } from "../../Assets/FullForm";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccorSummary from "./AccorSummary";

const PointCard = (props) => {
  const point = props.point;
  const flagmenu = props.flagmenu;
  const [flag, setFlag] = useState(false);
  function handleFlagMenu(e) {
    e.preventDefault();
    setFlag(!flag);
    console.log(flag);
  }

  const rawDatas = [
    {
      title: "Dummy Project",
      description:
        "This is dummy project Lorem ipsum dolor sit amet consectetur adipiscing elit conubia mus, natoque curae phasellus cras sagittis accumsan taciti luctus. Senectus proin potenti accumsan natoque cubilia dignissim augue mattis ex, eleifend interdum ligula neque hac curae pretium gravida justo, aliquam curabitur ad velit tellus praesent maecenas aenean. At dolor felis elementum magna fames mattis auctor nam sodales, ante diam ex ipsum finibus malesuada senectus aptent. Phasellus nisl ut rhoncus gravida dictumst dui dis interdum integer himenaeos varius mauris feugiat, adipiscing tristique habitant accumsan hendrerit nec neque consequat tincidunt penatibus vulputate. Et quis nostra eu accumsan magnis consequat quisque, consectetur mi nullam dignissim mollis turpis, libero mus semper vitae rutrum netus. Condimentum a fringilla eget tristique mollis arcu parturient fames conubia ultricies, sit nascetur potenti mauris ex est etiam facilisis dignissim. Pulvinar nisl hendrerit integer auctor at quisque donec sagittis rhoncus gravida, ex mauris pretium in nisi viverra diam sed. Nam eu commodo gravida tristique facilisi consequat aliquam hac egestas, vivamus nostra accumsan luctus litora velit lacinia viverra lobortis, placerat euismod tellus consectetur vestibulum iaculis adipiscing tortor.",
      status: "A",
      start_date: "31/12/2021",
      end_date: "31/1/2022",
      category: "Dummy$Project",
      proof_link: "https://www.google.com",
      flag: [
        "a@iitg.ac.in",
        "a@iitg.ac.in",
        "b@iitg.ac.in",
        "c@iitg.ac.in",
        "c@iitg.ac.in",
        "d@iitg.ac.in",
        "e@iitg.ac.in",
        "a@iitg.ac.in",
        "b@iitg.ac.in",
        "c@iitg.ac.in",
        "c@iitg.ac.in",
        "d@iitg.ac.in",
        "e@iitg.ac.in",
      ],
    },
    {
      title: "Dummy Project",
      description: "This is dummy project",
      status: "P",
      start_date: "1/12/2021",
      end_date: "31/1/2022",
      category: "Dummy$Project",
      proof_link: "https://www.gmail.com",
      flag: [],
    },
    {
      title: "Dummy Project",
      description: "This is dummy project",
      status: "R",
      start_date: "31/1/2022",
      end_date: "31/3/2022",
      category: "Dummy$Project",
      proof_link: "https://www.youtube.com",
      flag: [],
    },
  ];

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    // <div className={"card " + point.status}>
    <div className="accordioncards ">
      {rawDatas.map((rawData, index) => (
        <AccorSummary rawData={rawData} index={index} />
      ))}
      {/* <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            backgroundColor: "#A5D6A7",
            height: "65px",
          }}
        >
          <div className="heading_1">
            <div className=" p1">
              <img
                style={{ width: "65px" }}
                src="cc_logo.png"
                alt="coding club logo"
              />
            </div>
            <div className="p2">
              <h3>Dummy Project </h3>
            </div>
            <div className="p3">
              <h4>
                Approval Status : Approved By <span>ABC GAMMA</span>
              </h4>
            </div>
            <div className="p4">
              <h4>
                Added On : <span>31/12/2021</span>
              </h4>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#A5D6A7",
            // height: "85px",
          }}
        >
          <div className="description_1">
            <h4>
              Description :
              <span>
                This project was a dummy project created to placehold with
                designing .
              </span>
            </h4>
          </div>
          <div className="description_2">
            <h4>
              Project Duration : <span>March 21 - September 21</span>
            </h4>
            <a href="google.com">Link for the project</a>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={{
            backgroundColor: "#E57373",
            height: "65px",
          }}
        >
          <div className="heading_1">
            <div className=" p1">
              <img
                style={{ width: "65px" }}
                src="cc_logo.png"
                alt="coding club logo"
              />
            </div>
            <div className="p2">
              <h3>Dummy Project </h3>
            </div>
            <div className="p3">
              <h4>
                Approval Status : Approved By <span>ABC GAMMA</span>
              </h4>
            </div>
            <div className="p4">
              <h4>
                Added On : <span>31/12/2021</span>
              </h4>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#E57373",
            // height: "85px",
          }}
        >
          <div className="description_1">
            <h4>
              Description :
              <span>
                This project was a dummy project created to placehold with
                designing .
              </span>
            </h4>
          </div>
          <div className="description_2">
            <h4>
              Project Duration : <span>March 21 - September 21</span>
            </h4>
            <a href="google.com">Link for the project</a>
          </div>
        </AccordionDetails>
      </Accordion> */}

      {/* </div> */}
      {/* <div className="logo p1">
        <img
          style={{ width: "100px" }}
          src="cc_logo.png"
          alt="coding club logo"
        />
      </div>
      <div className="col p2">
        <div className="row">
          <div
            className="text-left"
            style={{ fontSize: "25px", fontWeight: "bold" }}
          >
            {point.title}
          </div>
          <div className="duration">
            Duration: {point.start_date} to {point.end_date}
          </div>
        </div>
        <div className="row text-left">Description : {point.description}</div>
        <div className="row">
          <div className="proof-link">
            <a href={point.proof_link}>Link for the proof</a>
          </div>
          <div className={"approval-status " + point.status + "a"}>
            Approval Status : {full[point.status]}
          </div>
        </div>
      </div>
      {flagmenu && (
        <div className="p4">
          <div
            className="flag-menu"
            onClick={(e) => {
              handleFlagMenu(e);
            }}
          >
            <MoreVert />
          </div>
          {flag && (
            <div className="flag-menu-window">Ask what to fill here</div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default PointCard;
