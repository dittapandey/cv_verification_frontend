import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HeadingPage from './Pages/HeadingPage/HeadingPage'
import {Route,
  BrowserRouter as Router,
  Routes, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {BACKEND_URL as url} from "./Assets/FullForm";
import { isAuthenticated } from './services/Auth_service';
import { createContext } from 'react';
import axios from 'axios';
import { CategoryList } from './Assets/Lists';

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [clubs, setClubs] = useState([{}]);
  const [clubId, setClubId] = useState({});
  const [rawData, setRawData] = useState([{}]);
  const [categoryData, setCategoryData] = useState({});



  function split_category(data){
    var _categoryData = JSON.parse(JSON.stringify(CategoryList));
    console.log(_categoryData);
    _categoryData["categories"].map((category)=>{
      category.sub_category.map((sub_category)=>{
        sub_category["data"]=[{}]
      })
    })
    data.map((point)=>{
      console.log(point.category);
      const _category = point.category.split('$');
      const category_index = _categoryData.hash[_category[0]]-1;
      const sub_category_index = _categoryData["categories"][category_index].hash[_category[1]];
      _categoryData["categories"][category_index].sub_category[sub_category_index]["data"].push(point)
    });
    console.log(_categoryData);
  
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
          console.log(res.data.user)
          setUser(res.data.user);
      } else {
          console.log("User data not received");
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




  useEffect(()=>{
    fetchOrgs();
    checkLogin();
    fetchRawData();
  },[]);
  return (
    <AppContext.Provider value={{
      clubs: [clubs,setClubs],
      clubId: [clubId, setClubId], 
      user: user,
      fetchRawData: fetchRawData}}>
      <div className="App">
        <Router>
          <Routes>
          <Route exact path="/" element={user? <Link to="/headingPage"/>:<LoginPage/>}/>
          <Route exact path="/headingPage" element={<HeadingPage/>}/>
          </Routes>
          
        </Router>
        {/* <LoginPage/> */}
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
