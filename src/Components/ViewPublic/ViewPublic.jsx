import Button from "../Button/Button";
import {useState, useMemo, useEffect, Fragment} from 'react';
import { useSortBy, useTable, usePagination, useExpanded } from 'react-table'
import "./ViewPublic.css";
import styled from "styled-components";
import { ArrowDownward, ChevronRight, ConstructionOutlined, KeyboardArrowDown, KeyboardArrowUp, Margin } from "@mui/icons-material";
import CollapsibleTable from "./TableRender";
import PublicCard from "../PublicCard/PublicCard";
import PointCard from "../PointCard/PointCard"
import CardContent from "../../Assets/CardContent";
import { BACKEND_URL as url } from "../../Assets/FullForm";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Card, Stack } from "@mui/material";
import { useCallback } from "react";

const Styles = styled.div`
  `


function DetailCard(props){
    const point = props;

    return(
        <Card className="detailCard">
            {point.title}
        </Card>
    );
}

function Table({ columns, data, renderRowSubComponent }) {
    // Use the state and functions returned from useTable to build your UI
    const [detailsCard, setDetailsCard] = useState(false);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      visibleColumns,
      previousPage,
      setPageSize,
      state:{ pageIndex, pageSize, expanded }
    } = useTable({
      columns,
      data,
      initialState:{pageIndex:0, pageSize: 5, isExpanded:false}
    },useSortBy, useExpanded, usePagination,)
  
    // Render the UI for your table
    return (
        <div className="table_content">
            <table className="table table-condensed" {...getTableProps()} style={{ borderCollapse: "collapse", borderSpacing:"0px 15px", width: "100%"}}>
                <thead  style={{backgroundColor:"#343A40",
                    padding:"10px",
                    width:"100%"}}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {/* {console.log(JSON.stringify(headerGroup.headers.original))} */}
                        {headerGroup.headers.map(column => {
                            return (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                            <span style={{alignContent:"center"}}>
                                {column.isSorted
                                ? column.isSortedDesc
                                    ? <KeyboardArrowDown/>
                                    : <KeyboardArrowUp/>
                                : <><KeyboardArrowDown/><KeyboardArrowUp/></>}
                            </span></th>
                        )})}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <Fragment {...row.getRowProps()}>
                            <tr dataToggle="collapse" dataTarget="#collapseData" className={row.original.status+" accordian-toggle"} style={{
                                height:"50px",
                                marginTop:"10px",
                            }} onClick={()=>{console.log(row.original)}}
                                onMouseEnter={()=>setDetailsCard(true)}
                                onMouseLeave={()=>setDetailsCard(false)}
                            >
                                {console.log(row.original)}
                                {row.cells.map(cell => {
                                    if(cell.value === row.original.description){
                                        if(cell.value.length>25){
                                            cell.value = cell.value.substring(0,25)+"...";
                                        }
                                        // console.log(cell.value);
                                    }
                                // return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                return <td {...cell.getCellProps()}>{cell.value}</td>
                                })}
                            </tr>
                                <tr>
                                    <td colSpan="12" class="hiddenRow">
                                        <div className="accordian-body collapse" id="collapseData">
                                        {JSON.stringify(row.original)}
                                        </div>
                                    </td>
                                </tr>
                        </Fragment>
                    )
                })}
                </tbody>
            </table>
            <div className="pagination">
                <div className="buttons">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                    </button>{' '}
                </div>
                <div className="page_control">
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                    </span>
                    <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                    </span>{' '}
                    <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    >
                    {[5, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>
                    ))}
                    </select>
                </div>
                
            </div>

        </div>
      
    )
  }

const ViewPublic = () => {
    const appContext = useContext(AppContext);
    const [query, setQuery] = useState("");
    const [rawData, setRawData] = appContext.rawData;
    function handleAddAPoint(){
        console.log("Add A Point Button Clicked");
    }
    function handleQuery(e){
        setQuery(e.target.value);
    }
    const columns = useMemo(
        ()=>[
                {
                    Header:"Click to render",
                    id:'expander',
                    Cell:({row})=>(
                        <span {...row.getToggleRowExpandedProps()}>
                            {/* {row.isExpanded? <ChevronRight/>:<KeyboardArrowDown/> } */}
                            {row.isExpanded? "right":"down" }
                        </span>
                    )
                },
                {
                    Header:"Title",
                    accessor:"title"
                },
                {
                    Header:"Description",
                    accessor:"description",
                    
                }
        ]
    );

    const renderRowSubComponent = useCallback(
        ({row}) => (
            <span>
                {JSON.stringify(row.values)}
            </span>
        ),[]
    )


    const [clubs, setClubs] = appContext.clubs;
    
    useEffect(()=>{
        appContext.fetchRawData();
    },[])
    return ( 
        <Stack>
            <div className="top">
                <div className="topupper">
                    <div className="addapointbutton">
                        <Button fg_color={"white"} bg_color={"#0A6ABF"} handleClick={handleAddAPoint} text={"Add A Point"}/>
                    </div>
                </div>
                <div className="toplower">
                    <div className="searchbar">
                        <form>
                            <input style={{
                                backgroundColor:"#FDFDFD",
                                borderStyle:"none",
                                borderRadius:"2.5ch",
                                minWidth: "200px",
                                minHeight:"35px",
                                textAlign:"left",
                                padding:"5px",
                                
                            }} type="text" 
                            value={query}
                            onChange={handleQuery}/>
                        </form>
                    </div>
                    <div className="redbuttons">
                        <div className="dropdown">
                            <button className="dropbtn" 
                            ><ArrowDownward fontSize="small"/>  Select Board</button>
                            <div className="dropdown-content">
                            {   
                                clubs.map((club)=>
                                    {
                                        return (
                                        <a href="#">
                                            {club.name}
                                        </a>
                                    );})
                            }
                        </div>
                        </div>
                        
                        <div className="dropdown">
                            <button className="dropbtn"
                            ><ArrowDownward fontSize="small"/>  Select Board</button>
                            <div className="dropdown-content">
                            {   
                                clubs.map((club)=>
                                    {
                                        return (
                                        <a href="#">
                                            {club.name}
                                        </a>
                                    );
                                }
                                )
                            }
                        </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <CollapsibleTable/>

        </Stack>
            
            // {/* <div className="bottom">
            //     <Styles>
            //         <Table columns={columns} data={rawData} renderRowSubComponent={renderRowSubComponent}/>
            //     </Styles>
                
            // </div> */}
        
     );
}
 
export default ViewPublic;