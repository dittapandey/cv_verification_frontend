import { useState } from "react";
import "./HeadingPage.css";
import NavBar from "../../Components/Navbar/Navbar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import ViewPoints from "../../Components/ViewPoints/ViewPoints";
import ViewPublic from "../../Components/ViewPublic/ViewPublic";
import FlaggedByYou from "../../Components/FlaggedByYou/FlaggedByYou";
import SelfFlag from "../../Components/SelfFlag/SelfFlag";
import GeneralGuidelines from "../../Components/GeneralGuidelines/GeneralGuidelines";
import AddAPoint from "../../Components/AddAPoint/AddAPoint";
import WorkInProgress from "../../Components/WorkInProgress/WorkInProgress";
import ViewRequest from "../../Components/ViewRequests/ViewRequests";
import FlagApprovals from "../../Components/FlagApprovals/FlagApprovals";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuList } from "../../Assets/Lists";
import { AppContext } from "../../App";
import { makeStyles } from "@mui/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: "#343A40",
  },
});

function HeadingPage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [item, setItem] = useState(MenuList[0]);
  const [showAddPoint, setShowAddPoint] = useState(false);
  const appContext = React.useContext(AppContext);
  // const history = useHistory();

  const [clubs, setClubs] = appContext.clubs;
  const [user, setUser] = appContext.user;

  // let history = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleClick(menuitem) {
    setItem(menuitem);
    MenuList.map((M) => {
      if (M === menuitem) {
        M.selected = true;
      } else {
        M.selected = false;
      }
    });
  }

  // const [currentAdmin, setCurrentAdmin] = appContext.setCurrentAdmin;
  // const AdminKeys = Object.keys(user.admin);
  function itemRender(M) {
    if (M.id === 1) {
      return <ViewPoints setShowAddPoint={setShowAddPoint} />;
    } else if (M.id === 2) {
      return <ViewPublic />;
    } else if (M.id === 3) {
      return <FlaggedByYou />;
    } else if (M.id === 4) {
      return <SelfFlag />;
    } else if (M.id === 5) {
      return <GeneralGuidelines />;
    } else if (M.id == 6) {
      return <WorkInProgress />;
    } else if (M.id == 7) {
      return <ViewRequest />;
    } else if (M.id == 8) {
      return <WorkInProgress />;
    } else if (M.id == 9) {
      return <FlagApprovals />;
    } else if (M.id == 10) {
      return <GeneralGuidelines />;
    }
  }

  const container =
  window !== undefined ? () => window().document.body : undefined;

function logout() {
  axios
    .get(url + "/auth/logout", {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      },
    })
    .then((res) => {
      console.log(user);
      setUser(null);
      // history("/");
    });
}

  function handleChange() {}

  const drawer = (
    <div>
      <Toolbar>
        <img src="iitg-logo.png" alt="" style={{ height: "30px" }} />
        {"\t\t"}CV Verfication
      </Toolbar>
      <Divider />
      <Toolbar>Welcome {user ? user.name : "Guest"}</Toolbar>
      <Divider />
      <List>
        {MenuList.map((item, index) => {
          if (item.id <= 5) {
            return (
              <ListItem
                onClick={() => {
                  handleClick(item);
                }}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            );
          }
        })}
      </List>
      <Divider />
      {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Select Admin's Organisation</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currentAdmin}
                    onChange={handleChange}
                    label="Organization"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl> */}
      <Divider />
      {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl> */}
      <Divider />
      <List>
        {MenuList.map((M, index) => {
          if (M.id >= 6) {
            return (
              <ListItem  onClick={() => handleClick(M)}>
                <ListItemText primary={M.title} />
              </ListItem>
            );
          }
        })}
      </List>
    </div>
  );



  React.useEffect(()=>{
    appContext.checkLogin();
  },[])

  return (
    <>
      {showAddPoint && <AddAPoint setShowAddPoint={setShowAddPoint} />}

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Responsive drawer
            </Typography> */}
            <Button
              onClick={() => {
                logout();
              }}
              color="inherit"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            className={classes.paper}
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {itemRender(item)}
        </Box>
      </Box>
    </>
  );
}

HeadingPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default HeadingPage;
