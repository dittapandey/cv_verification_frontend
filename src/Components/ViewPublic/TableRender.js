import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AppContext } from '../../App';
import { makeStyles } from '@mui/styles';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
import { Alert, Button, Grid, Snackbar, TableFooter, TablePagination, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { BACKEND_URL as url } from '../../Assets/FullForm';
import { useState } from 'react';
import {full} from '../../Assets/FullForm'

const useStyles = makeStyles(
   { 
       headTableRow: {
        color:"white"
        },
    }
);
  
  


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
        </IconButton>
      </Box>
    );
}
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

function Row(props) {
    const appContext = React.useContext(AppContext);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [snackSuccessbarOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackFailurebarOpen, setSnackbarFailureOpen] = useState(false);
  const [pointUser, setPointUser] = React.useState({});
  const user = appContext.user;
  const [flagDesc, setFlagDesc] = useState("");

  function collapsePoint(){
      if(!open){
        axios.get(url+`/user/find/${row.user_id}`, {
            withCredentials:true,
            headers:{
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers":
                    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
            }
        })
        .then((res)=>{
            if(res.data){
                
                setPointUser(res.data);
            } else {
                console.log(res);
                console.log("User data not received");
            }
        })
      }
      setOpen(!open);

  }
  const [category,sub_category] = row.category.split('$');

  function handleChange(event){
      setFlagDesc(event.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function handleFlag(e){
      e.preventDefault();
      console.log(1);
      axios.post(url+`/points/${row.point_id}/flag`, {
        withCredentials:true,
        headers:{
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        }
    })
    .then((res)=>{
        if(res.status==200){
            console.log(res);
        } 
    })
  }

  return (
    <React.Fragment>
      <TableRow className={row.status} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => collapsePoint()}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.point_id}
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        <TableCell align="center">{row.description}</TableCell>
        <TableCell align="center">{row.user_id}</TableCell>
        <TableCell align="center">{full[row.status]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={row.status} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1,}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography>Category: {category}-{sub_category}</Typography>
                    <Typography>Project by: {pointUser.name}</Typography>
                    <Typography>Email ID: {pointUser.user_id}</Typography>
                    <Typography>Started on: {row.start_date}</Typography>
                    <Typography>Ended on: {row.end_date}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">Flagging Form</Typography>
                    <Typography>Reason for Flagging</Typography>
                    <Box sx={{height:"10px"}}></Box>
                    <TextField
                    id="flagDesc"
                    name="flagDesc"
                    label="Descripiton"
                    type="text"
                    value={flagDesc || ""}
                    onChange={handleChange}
                    // autoComplete="current-password"
                    />
                    <Box sx={{height:"10px"}}></Box>
                    <p><Button onClick={(e)=>{handleFlag(e)}} variant="contained">Flag this Point</Button></p>
                </Grid>
            </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function CollapsibleTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();
    const appContext = React.useContext(AppContext);
    const [rawData, setRawData] = appContext.rawData;
    const keys = Object.keys(rawData[0]);

  // Avoid a layout jump when reaching the last page with empty rows.
     const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rawData.length) : 0;

      const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    
    console.log(keys);
    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow style={{color:"white"}}>
                <TableCell />
                
                <TableCell >Point Id</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">userID</TableCell>
                <TableCell align="center">Approval Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {(rowsPerPage > 0
            ? rawData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rawData
          ).map((row) => (
            <Row key={row.point_id} keys={keys} row={row} />
          ))}
            </TableBody>
            <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rawData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
        </TableContainer>
    );
}