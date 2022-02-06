import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccorSummary = ({ rawData, index }) => {
  const [expanded, setExpanded] = React.useState(false);
  console.log(rawData, index);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const approvaltext = () => {
    if (rawData.status === "A") {
      return (
        <>
          Approved By <span>ABC GAMMA</span>
        </>
      );
    } else if (rawData.status === "P") {
      return <>Waiting for Approval</>;
    } else
      return (
        <>
          Flagged by <span>ABC GAMMA</span>
        </>
      );
  };
  return (
    <>
      <Accordion
        expanded={expanded === `panel${index + 1}`}
        onChange={handleChange(`panel${index + 1}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            backgroundColor:
              rawData.status === "A"
                ? "#A5D6A7"
                : rawData.status === "P"
                ? "#FFF176"
                : "#E57373",
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
              <h3>{rawData.title}</h3>
            </div>
            <div className="p3">
              <h4>Approval Status : {approvaltext()}</h4>
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
            backgroundColor:
              rawData.status === "A"
                ? "#A5D6A7"
                : rawData.status === "P"
                ? "#FFF176"
                : "#E57373",
            // height: "85px",
          }}
        >
          <div className="description_1">
            <h4>
              Description :<span>{rawData.description}</span>
            </h4>
          </div>
          <div className="description_2">
            <h4>
              Project Duration :{" "}
              <span>
                {rawData.start_date} - {rawData.end_date}
              </span>
            </h4>
            <a href={rawData.proof_link}>Link for the project</a>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccorSummary;
