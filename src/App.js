import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import {Router, Routes,BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Router path="/">
          <LoginPage/>
        </Router>
      </Routes>
      </BrowserRouter>
      <LoginPage/>
    </div>
  );
}

export default App;
