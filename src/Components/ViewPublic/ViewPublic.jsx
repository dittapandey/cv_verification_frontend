import Button from "../Button/Button";
import {useState, useMemo, useEffect} from 'react';
import { useSortBy, useTable, usePagination, useExpanded } from 'react-table'
import "./ViewPublic.css";
import styled from "styled-components";
import { ArrowDownward, ConstructionOutlined, Margin } from "@mui/icons-material";
import PublicCard from "../PublicCard/PublicCard";
import PointCard from "../PointCard/PointCard"
import CardContent from "../../Assets/CardContent";
import { BACKEND_URL as url } from "../../Assets/FullForm";

const Styles = styled.div`
  `



function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
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
      previousPage,
      setPageSize,
      state:{pageIndex, pageSize, }
    } = useTable({
      columns,
      data,
      initialState:{pageIndex:1, pageSize: 5}
    },useSortBy,usePagination)
  
    // Render the UI for your table
    return (
        <div className="table_content">
            <table {...getTableProps()} style={{ borderCollapse: "separate", borderSpacing:"0px 15px", width: "100%"}}>
                <thead  style={{backgroundColor:"#343A40",
                    padding:"10px",
                 width:"100%"}}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {/* {console.log(JSON.stringify(headerGroup.headers.original))} */}
                        {headerGroup.headers.map(column => {
                            console.log(column.headers);
                            return (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                            <span>
                                {column.isSorted
                                ? column.isSortedDesc
                                    ? '🔽'
                                    : '🔼'
                                : '🔽🔼'}
                            </span></th>
                        )})}
                        </tr>
                    ))}
                    </thead>
                
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (

                            <tr className={row.original.status}{...row.getRowProps()} style={{
                                height:"50px",
                                marginTop:"10px"
                            }}
                            >
                                {/* {console.log(row.original.status)} */}
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
                            /* <tr style={{horizontalAlign:"center"}}>
                                <td></td>
                                <td ><PointCard point={row.original} flagmenu={true}/></td>
                                <td></td>
                            </tr> */
                        
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
    const [query, setQuery] = useState("");
    const point = {
        title:"Dummy Point",
        description:"This point was made for dummy testing of the points card",
        start_date: "23/12/2002",
        end_date:"12/12/2002",
        category:"experience",
        proof_link: "https://www.google.com/",
        status:"D",
        visibility:"P"
    }
    function handleAddAPoint(){
        console.log("Add A Point Button Clicked");
    }
    function handleQuery(e){
        setQuery(e.target.value);
    }
    const columns = useMemo(
        ()=>[
                {
                    Header:"Title",
                    accessor:"title"
                },
                {
                    Header:"Description",
                    accessor:"description",
                    
                },
                {
                    Header:"End Date",
                    accessor:"end_date"
                }
        ]
    );
    // const data = useMemo(()=>{CardContent},[])

    const [clubs, setClubs] = useState(
        [
            {org_id: 100, name: 'Coding Club', createdAt: '2022-01-03T06:57:39.000Z', updatedAt: '2022-01-03T06:57:39.000Z', parent_org_id: null}
        ]
    );

    function fetchClubs(){
        fetch(url+"/orgs")
        .then((res)=>res.json())
            .then((result)=>{
                console.log(result);
                setClubs(result);
            }).catch((e)=>{
                console.error("Error Message is",e.message)
            });
    }
    
    useEffect(()=>{
        fetchClubs();
    },[])
    return ( 
        <div className="viewpoint">
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
                                        // <div className="clubitem">
                                        //     {club.name}
                                        // </div>
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
                                        // <div className="clubitem">
                                        //     {club.name}
                                        // </div>
                                        <a href="#">
                                            {club.name}
                                        </a>
                                    );})
                            }
                        </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <div className="bottom">
                <Styles>
                <Table columns={columns} data={CardContent}/>
                </Styles>
                
            </div>
        </div>
     );
}
 
export default ViewPublic;