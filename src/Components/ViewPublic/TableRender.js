import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AppContext } from "../../App";
import { makeStyles, styled } from "@mui/styles";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  Snackbar,
  TableFooter,
  TablePagination,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import axios from "axios";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import { useState } from "react";
import {visuallyHidden} from '@mui/utils';
import { full } from "../../Assets/FullForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#343A40",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function descendingComparator(a, b, orderBy){
  if( b[orderBy]<a[orderBy]){
    return -1;
  }
  if(b[orderBy] > a[orderBy]){
    return 1;
  } 
  return 0;
}

function getComparator(order, orderBy){
  return order=='desc' ? (a,b) => descendingComparator(a,b,orderBy) :(a,b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator){
  const stabilizedThis = array.map((el, index)=>[el,index]);
  stabilizedThis.sort((a,b)=>{
    const order = comparator(a[0], b[0]);
    if(order !== 0){
      return order;
    }
    return a[1]-b[1];
  });

  return stabilizedThis.map((el)=> el[0]);
}

const headCells = [
  {
    id:"Point ID"
  },
  {
    id:"Roll No."
  },
  {
    id:"Student Name"
  },
  {
    id:"Point Title"
  },
  {
    id:"Approved By"
  },
  {
    id:"Added On"
  }
]

function EnhancedTableHead(props){
  const { order, orderBy, onRequestSort} =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
  

  return(
    <TableHead>
      <TableRow>
      {
        headCells.map((head)=>{
          return(
            <StyledTableCell align="center"
              key={head.id}
              sortDirection = {orderBy === headCells.id ? order : false}
            >
            <TableSortLabel
              active={orderBy == headCells.id}
              direction={orderBy === headCells.id ? order : 'asc'}
              onClick={createSortHandler(head.id)}
            >
              {head.id}
              {orderBy === head.id? (
                <Box component="span" sx={visuallyHidden}>
                  {order==='desc'? 'sorted descending' : 'sorted ascending'}
                </Box>
              ): null}
            </TableSortLabel>
            </StyledTableCell>
          )
        })
      }
      {/* <StyledTableCell align="center">Point Id</StyledTableCell>
      <StyledTableCell align="center">Title</StyledTableCell>
      <StyledTableCell align="center">Description</StyledTableCell>
      <StyledTableCell align="center">userID</StyledTableCell>
      <StyledTableCell align="center">Approval Status</StyledTableCell> */}
      <StyledTableCell align="center" />
      </TableRow>
    </TableHead>

  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc','desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

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
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
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
  var row = {
    title:"",
    description:"",
    createdAt:"T",
    point_id:"",
    category:"$",
    start_date:"",
    end_date:"",
    User:{
      name:"",
      roll_no:"",
      user_id:""
    },
    Flags: [
      {
        flagged_by:""
      }
    ]
  }
  row  = props.row;
  const [date, time] = row.createdAt.split('T')
  const [open, setOpen] = React.useState(false);
  const user = appContext.user;

  function collapsePoint() {
    setOpen(!open);
  }
  const [ category, sub_category ] = row.category.split("$");


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleFlag = async (e) => {
    e.preventDefault();
    const response = await fetch(url+`/flag/${row.point_id}`,{method:"POST", credentials:"include"})
    if(response.status === 400) {
      alert(response.error.message);
    } else if (response.status === 200){
      alert ("Point flagged");
    }
    setOpen(!open);
    appContext.fetchRawData();
  }

  const [isFlaggable, setIsFlaggable] = useState(true);

  const checkFlaggable = () => {
    console.log("Is flag check implemented")
    row.Flags.map((flag)=>{
      console.log(flag)
      console.log(user)
      if(flag.flagged_by === user[0].user_id){
        setIsFlaggable(false);
      }
    })
  }
  
  React.useEffect(()=>{
    checkFlaggable();
  },[open])
  

  return (
    <React.Fragment>
      <TableRow
        className={row.status}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        
        <TableCell align="center" component="th" scope="row">
          {row.point_id}
        </TableCell>
        <TableCell align="center">{row.User.roll_no}</TableCell>
        <TableCell align="center">{row.User.name}</TableCell>
        <TableCell align="center">{row.title}</TableCell>
        <tableCell align="center">{row.response_by}</tableCell>
        <TableCell align="center">{date}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => collapsePoint()}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={row.status}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={12}
        >
          <Collapse in={open} timeout="3000" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                  <Typography><b>Branch:</b>{row.User.branch}</Typography>
                  <Typography><b>Description:</b>{row.description}</Typography>
                  <Typography><b>Project Durattion:</b> {row.start_date} to {row.end_date}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{display:'flex',flexWrap:'wrap'}}>
                    <Box sx={{display:'flex', flexDirection:"column", justifyContent:"center"}}><Typography><b align="center">Have issues with this project?</b></Typography></Box>
                    {isFlaggable?<Button variant="contained" color="error" sx={{margin:"10px"}} onClick={(e)=>handleFlag(e)}>Flag this Point</Button>:<p>You have already flagged this point once</p>}
                  </Box>
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
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [dense, setDense] = React.useState(false);
  const appContext = React.useContext(AppContext);
  const [rawData, setRawData] = appContext.rawData;
  const [publicData, setPublicData] = React.useState([{
    title:"",
    point_id:"",
    description:"",
    category:"$",
    createdAt:"T",
    response_by:"",
    start_date:"",
    end_date:"",
    User:{
      name:"",
      roll_no:"",
      branch:""
    },
    Flags: [
      {
        flagged_by:""
      }
    ]
  }]);
  const [order, setOrder]= React.useState('asc');
  const [orderBy,setOrderBy] = React.useState('Point ID')

  const handleRequestSort = (event,property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc? 'desc' : 'asc');
    setOrderBy(property);
  }


  const keys = Object.keys(rawData[0]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - publicData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const splitRawData = () => {
    const tempData =[];
    rawData.map((point)=>{
      if(point.visibility==="P"){
        tempData.push(point);
      }
    });
    console.log(tempData);
    setPublicData(tempData);
  }

  
  // console.log(keys);

  React.useEffect(()=>{
    appContext.fetchRawData();
    splitRawData();
  },[])

  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size={dense ? 'small' : 'medium'}>
        <EnhancedTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        />
        <TableBody>
          {(rowsPerPage > 0
            ? publicData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : publicData
          ).map((row) => (
            <Row key={row.point_id} keys={keys} row={row} />
          ))}
          {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100, { label: "All", value: -1 }]}
              colSpan={3}
              count={publicData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
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
