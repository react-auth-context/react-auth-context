import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import About from './pages/About';
import Home from './pages/Home';
import {AuthContext} from './context/Authcontext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/Login';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

if(localStorage.getItem("token")) {
  let token = localStorage.getItem("token")
  axios.defaults.headers.common["Authorization"] =`bearer ${token}`;
}

function App() {
  const [auth, setAuth] = useState({
    logedIn: false
  });

  const fetchCurrentUser = async() => {
    const response = await axios.get("/");
    if(response.status == "200" && response.data) {
      setAuth((prevState) => {
        return {
          ...prevState,
          logedIn: true,
          user: response.data
        }
      });
    } else if (response.status = "401") {
      setAuth({logedIn: false})
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{auth, setAuth}}>
        <div className="App"> 
          <h1>React auth context</h1>
          <Navigation></Navigation>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
