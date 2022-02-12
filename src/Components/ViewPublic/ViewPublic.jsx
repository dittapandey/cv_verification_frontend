import { useState, useMemo, useEffect, Fragment } from "react";
import "./ViewPublic.css";
import CollapsibleTable from "./TableRender";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { Box } from "@mui/system";

const ViewPublic = () => {
  const appContext = useContext(AppContext);
  const [clubs, setClubs] = appContext.clubs;
  useEffect(() => {
    appContext.fetchRawData();
  }, []);
  return (
    <Stack>
      <Box
        sx={{margin:"10px",padding:"20px", display:"flex", flexDirection:"column", justifyConstent:"center", border:1,
        borderRadius:"10px"
      }}
      >
        <Typography variant="h6">
          View the Approved CV Points of all your friends and collegues and flag them in order to raise any disputes against the points.
        </Typography>
        <Typography variant="subtite1">
        <p><b>Note:</b> All flagging activity is monitored and cases of aimless flagging will be dealt with carefully and strictly.</p>
        </Typography>
      </Box>
      
      <Divider/>
      <CollapsibleTable />
      
      
    </Stack>
  );
};

export default ViewPublic;
