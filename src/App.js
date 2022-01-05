import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import AddAPoint from './Pages/AddAPoint/AddAPoint'
import {Route,
  BrowserRouter as Router,
  Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';

function App() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const getUser = () => {
      
    }
  });
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/landingpage" element={<AddAPoint/>}/>
        </Routes>
        
      </Router>
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
