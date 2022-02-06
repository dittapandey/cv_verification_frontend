import "./ViewPoints.css";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { CategoryList } from "../../Assets/Lists";
import {
  Button,
  Divider,
  Grid,
  Stack,
  Tab,
  TabPanelUnstyled,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import BasicTabs from "./TabPanel";
import { BiSearch } from "react-icons/bi";

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

const ViewPoints = (props) => {
  const appContext = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [clubMenu, setClubMenu] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(
    CategoryList["categories"][0]
  );
  const [rawData, setRawData] = useState([{}]);
  const [categoryData, setCategoryData] = appContext.categoryData;
  const setShowAddPoint = props.setShowAddPoint;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleAddAPoint() {
    setShowAddPoint(true);
  }
  function handleQuery(e) {
    setQuery(e.target.value);
  }

  const [clubs, setClubs] = appContext.clubs;

  // function fetchClubs(){
  //     fetch(url+"/orgs")
  //     .then((res)=>res.json())
  //         .then((result)=>{
  //             console.log(result);
  //             setClubs(result);
  //         }).catch((e)=>{
  //             console.error("Error Message is",e.message)
  //         });
  // }

  function categoryChange(_category) {
    setCurrentCategory(_category);
    CategoryList["categories"].map((category) => {
      if (category.title === _category) {
        category.selected = true;
      } else {
        category.selected = false;
      }
    });
  }

  function toggleClubMenu() {
    setClubMenu(!clubMenu);
  }

  useEffect(() => {
    appContext.fetchRawData();
  }, []);

  return (
    // <Stack>
    <>
      <div className="abc">
        <Button variant="contained" onClick={() => handleAddAPoint()}>
          Add A Point
        </Button>
        <div className="xyz">
          <BiSearch
            style={{
              fontSize: "25px",
              position: "relative",
              top: "10px",
              left: "35px",
            }}
          />
          <input
            className="searchkey"
            type="text"
            value={query}
            onChange={handleQuery}
            placeholder="Search for keywords..."
          />
        </div>
      </div>
      {/* <div className="top">
        <div className="addapointbutton">
          <Button
            variant="contained"
            onClick={() => {
              handleAddAPoint();
            }}
          >
            Add A Point
          </Button>
        </div>
        <input type="text" value={query} onChange={handleQuery} />
      </div> */}
      {/* <Grid>
          <Grid item xs={8}>
            <form> */}

      {/* </form>
          </Grid> */}
      {/* <Grid item xs={4}>
            <div className="redbuttons">
              <div className="dropdown">
                <button
                  className="dropbtn"
                  onClick={() => {
                    toggleClubMenu();
                  }}
                >
                  <ArrowDownward fontSize="small" /> Select Board
                </button>
                <div className="dropdown-content">
                  {clubs.map((club) => {
                    return (
                      // <div className="clubitem">
                      //     {club.name}
                      // </div>
                      <a href="#">{club.name}</a>
                    );
                  })}
                </div>
              </div> */}

      {/* <div className="dropdown">
                <button
                  className="dropbtn"
                  onClick={() => {
                    toggleClubMenu();
                  }}
                >
                  <ArrowDownward fontSize="small" /> Select Board
                </button>
                <div className="dropdown-content">
                  {clubs.map((club) => {
                    return (
                      // <div className="clubitem">
                      //     {club.name}
                      // </div>
                      <a href="#">{club.name}</a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Grid> */}
      {/* </Grid> */}

      <BasicTabs categoryData={categoryData} />

      {/* <div className="Selection-bar middle">
        {CategoryList["categories"].map((category) => {
          return (
            <button
              type="button"
              onClick={() => {
                categoryChange(category);
              }}
            >
              {category.title}
            </button>
          );
        })}
      </div> */}
      {/* <div className="bottom">
        {currentCategory.sub_category.map((sub_category) => {
          return (
            <div className="sub_category">
              <div style={{ height: "30px" }}></div>
              <Typography sx={{ fontSize: "30px" }}>
                {sub_category.title}
              </Typography>
              <Divider />
              {categoryData["categories"][currentCategory.id - 1].sub_category[
                (sub_category.id % 10) - 1
              ]["data"].map((point) => {
                return <PointCard point={point} flagmenu={false} />;
              })}
            </div>
          );
        })}
      </div> */}
      {/* </Stack> */}
    </>
  );
};

export default ViewPoints;
