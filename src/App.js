import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HeadingPage from './Pages/HeadingPage/HeadingPage';
import HeadingPageCopy from './Pages/HeadingPage copy/HeadingPageCopy'
import {Route,
  BrowserRouter as Router,
  Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {BACKEND_URL as url} from "./Assets/FullForm";


function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route exact path="/headingPage" element={<HeadingPage/>}/>
        <Route exact path="/headingPageCopy" element={<HeadingPageCopy/>}/>
        </Routes>
        
      </Router>
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
