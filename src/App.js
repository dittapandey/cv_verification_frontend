import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HeadingPage from './Pages/HeadingPage/HeadingPage'
import {Route,
  BrowserRouter as Router,
  Routes, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {BACKEND_URL as url} from "./Assets/FullForm";
import { createContext } from 'react';
import axios from 'axios';
import { CategoryList } from './Assets/Lists';
import {useNavigate} from 'react-router-dom';

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [clubs, setClubs] = useState([{org_id: 100, name: 'Coding Club', createdAt: '2022-02-05T10:05:45.000Z', updatedAt: '2022-02-05T10:05:45.000Z', parent_org_id: null}]);
  const [clubId, setClubId] = useState({});
  const [rawData, setRawData] = useState([{}]);
  const [adminData, setAdminData] = useState([{}]);
  // const history = useNavigate();
  const [categoryData, setCategoryData] = useState(
    {
      "categories":[
      {   
          id:1,
          title: "Projects",
          selected:true,
          sub_category: [
              {
                  id:11,
                  title: "Personal Project",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              },
              {
                  id:12,
                  title: "Project under IITG clubs/orgs",
                  data:[{
                    title:"",
                    description:"",
                    category:""
                  }]
              },
              {
                  id:13,
                  title: "Projects under non-IITG clubs/orgs",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              },
              {
                  id:14,
                  title:"Projects under profs",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              }
          ],
          hash:{
              "Personal Project": 11,
              "Project under IITG clubs/orgs": 12,
              "Projects under non-IITG clubs/orgs": 13,
              "Projects under profs": 14
          }
      },
      {
          id:2,
          title: "Courses",
          selected:false,
          sub_category: [
              {
                  id:21,
                  title: "College Course",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              },{
                  id:22,
                  title: "Online Courses",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              }
          ], 
          hash: {
              "College Course":21,
              "Online Courses":22
          }
      },
      {
          id:3,
          title: "Positions of responsibility",
          selected:false,
          sub_category: [
              {
                  id:31,
                  title:"In IITG",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              },
              {
                  id:32,
                  title:"Outside IITG",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              }
          ],
          hash:{
              "In IITG":31,
              "Outside IITG":32
          }
      },
      {
          id:4,
          title: "Achievements",
          selected:false,
          sub_category:[
              {
                  id:41,
                  title:"Inside IITG",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              },
              {
                  id:42,
                  title:"Outside IITG",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              }
          ],
          hash: {
              "Inside IITG":41,
              "Outside IITG":42
          }
      },
      {
          id:5,
          title:"Experience",
          selected:false,
          sub_category:[
              {
                  id:51,
                  title: "Project under IITG clubs/orgs",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              },
              {
                  id:52,
                  title: "Projects under non-IITG clubs/orgs",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              },
              {
                  id:53,
                  title:"Projects under profs",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              }
          ],
          hash:{
              "Project under IITG clubs/orgs":51,
              "Projects under non-IITG clubs/orgs":52,
              "Projects under profs":53,
          }
      },
      {
          id:6,
          title:"Extracurriculars",
          selected:false,
          sub_category:[
              {
                  id:61,
                  title: "Extracurriculars",
                  data:[{
                    title:"",
                    description:"",
                    category:"",
                    
                  }]
              }
          ],
          hash:{
              "Extracurriculars":61
          }
      }
  ],
  "hash":{
      "Projects":1,
      "Courses":2,
      "Positions of responsibility":3,
      "Achievements":4,
      "Experience":5,
      "Extracurriculars":6
  }
  }
  );



  function split_category(data){
    var _categoryData = JSON.parse(JSON.stringify(CategoryList));
    
    _categoryData["categories"].map((category)=>{
      category.sub_category.map((sub_category)=>{
        sub_category["data"]=[]
      })
    })
    console.log(_categoryData);
    data.map((point)=>{
      if(point.status!='D')
      {console.log(point.category);
      const _category = point.category.split('$');
      const category_index = _categoryData.hash[_category[0]]-1;
      console.log(category_index);
      const sub_category_index = _categoryData["categories"][category_index].hash[_category[1]]%10 - 1;
      console.log(sub_category_index);
      _categoryData["categories"][category_index].sub_category[sub_category_index]["data"].push(point);}
    });
    console.log(_categoryData);
    setCategoryData(_categoryData);
  
  }

  function checkLogin(){
    axios.get(url+"/auth/status", {
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
      if(res.data.user){
          console.log(res.data)
          setUser(res.data.user);
          const keys  = Object.keys(res.data.admin);
          var temp =[];
          ////////-----------------------------------------------------------------NOT COMPLETED YET-----------------------------------------------------------------
          keys.map((key)=>{
            const k = parseInt(key);
            if(k!==0){
                clubs.map((i)=>{
                  console.log(i.org_id)
                  if(i.org_id === k){
                    temp.push(i);
                  }
                })
            }
            // console.log(key, key!=="0");
          })
          setAdminData(temp);
          console.log("Admin of", adminData);
          
      } else {
          setUser(null);
          console.log("User data not received");
          // history("/");
      }
  })
  }


  function fetchOrgs(){
    fetch(url+"/orgs")
    .then(res=>res.json())
    .then(response=>{
      console.log(response);
      setClubs(response);
      var hash= new Object();
      response.map((club)=>{
        hash[club.name] = club.org_id;
      })
      console.log(hash);
      setClubId(hash);

    });
  }

  function fetchRawData(){
    axios.get(url+"/points/all", {
      withCredentials: true,
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
      setRawData(res.data);
      split_category(res.data);
      // split_data(res.data);
      console.log(res.data);
    })
  }

  const [currentAdmin, setCurrentAdmin] = useState('0');
  
  useEffect(()=>{
    fetchOrgs();
    checkLogin();
    fetchRawData();
  },[]);
  return (
    <AppContext.Provider value={{
      clubs: [clubs,setClubs],
      clubId: [clubId, setClubId], 
      user:[ user, setUser],
      fetchRawData: fetchRawData,
      checkLogin: checkLogin,
      categoryData: [categoryData,setCategoryData],
      rawData: [rawData,setRawData],
      currentAdmin: [currentAdmin, setCurrentAdmin],
      adminData: [adminData, setAdminData],
      }}>
      <div className="App">
        <Router>
          <Routes>
          <Route exact path="/" element={user? <Link to="/headingPage"/>:<LoginPage/>}/>
          {/* <Route exact path="/headingPage" element={<HeadingPage/>}/> */}
          <Route exact path="/headingPage" element={user? <HeadingPage/>: <Link to="/"/>}/>
          </Routes>
        </Router>
        {/* <LoginPage/> */}
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
