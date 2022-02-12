import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Popover from "@mui/material/Popover";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

const AccorSummary = ({ rawData, index }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [personName, setPersonName] = React.useState([]);

  const [expanded, setExpanded] = React.useState(false);
  // console.log(rawData, index);
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
  let { description } = rawData;

  let descriptionslice = description.slice(0, 320);
  if (description.length > 320) {
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
      <Accordion
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
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
            {/* <div> */}
            <Typography
              aria-owns={openpop ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <div className="descriptiontitle">
                <h4>
                  Description :{" "}
                  <span className="descriptionhover">{descriptionslice}</span>
                </h4>
              </div>
            </Typography>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
                width: "85%",
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
              <Typography sx={{ p: 1 }}>{rawData.description}</Typography>
            </Popover>
            {/* </div> */}
            {/* <div className="flaggedby">
              <select value={rawData.flag || ""}>
                <option value="">Flagged By</option>
                {rawData.flag.map((category) => {
                  return <option value={category}>{category}</option>;
                })}
              </select>
            </div> */}
            {/* {rawData.flag[0] && (
              <div className="flaggedby">
                <FormControl sx={{ m: 1, width: 250, margin: 0 }}>
                  <InputLabel
                    id="demo-multiple-chip-label"
                    sx={{
                      color: "black",
                      fontSize: "1vmax",
                      fontWeight: "500",
                    }}
                  >
                    Flagged By
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {rawData.flag.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )} */}
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
