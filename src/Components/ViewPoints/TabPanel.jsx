import * as React from "react";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CategoryList } from "../../Assets/Lists";
import { Divider } from "@mui/material";
import PointCard from "../PointCard/PointCard";
import { AppContext } from "../../App";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const appContext = useContext(AppContext);
  const [value, setValue] = React.useState(0);
  const categoryData = props.categoryData;
  const [currentCategory, setCurrentCategory] = useState(
    CategoryList["categories"][0]
  );
  const user = appContext.user;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function categoryChange(_category) {
    setCurrentCategory(_category);
    categoryData["categories"].map((category) => {
      if (category.title === _category) {
        category.selected = true;
      } else {
        category.selected = false;
      }
    });
  }

  return (
    <>
      <div className="tabpanels">
        {/* <Box sx={{ width: "100%" }}> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            indicatorColor="black"
            textColor="black"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {categoryData["categories"].map((category, index) => {
              return (
                <Tab
                  label={category.title}
                  {...a11yProps(index)}
                  onClick={() => {
                    categoryChange(category);
                  }}
                />
              );
            })}
          </Tabs>
        </Box>

        {currentCategory.sub_category.map((sub_category, index) => {
          return (
            <div className="sub_category">
              <div style={{ height: "30px" }}></div>
              <Typography sx={{ fontSize: "30px" }}>
                {sub_category.title}
              </Typography>
              <Divider />
              {<PointCard point={categoryData["categories"][currentCategory.id - 1].sub_category[
                index
              ]["data"]} flagmenu={false} />}
              {/* {categoryData["categories"][currentCategory.id - 1].sub_category[
                index
              ]["data"].map((point) => {
                if(point.user_id === user.user_id)                              // Comment this out to run without backend
                   return <PointCard point={point} flagmenu={false} />;
              })} */}
            </div>
          );
        })}
      </div>
    </>
  );
}
