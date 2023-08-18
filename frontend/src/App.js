import React, {useState, useEffect}from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./public/NavBar";
import CreateAccount from "./public/CreateAccount";
import Deposit from "./public/Deposit";
import Home from "./public/Home";
import Withdraw from "./public/Withdraw";
import AllData from "./public/AllData";
import NotFound from "./components/NotFound";
import Login from "./public/Login";
import Logout from "./public/Logout";
import "./App.css";
//export const baseURL = 'http://localhost:3001';
export const baseURL = 'https://quinn-badbank-backend.onrender.com'

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(false);
  useEffect(()=> {
    const usefromStorage = localStorage.getItem("currentUser")
    if(usefromStorage) {setIsLoggedIn(true)}
  }, []);
  return (
    <Router>
      <div className="App">
        <NavBar 
        isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/CreateAccount" element={<CreateAccount setIsLoggedIn={setIsLoggedIn}/>}></Route>
            <Route path="/Deposit" element={<Deposit/>}></Route>
            <Route path="/Withdraw" element={<Withdraw/>}></Route>
            <Route path="/AllData" element={<AllData/>}></Route>
            <Route path="/Login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
            <Route path="/Logout" element={<Logout/>}></Route>
            
            <Route path="*" element={<NotFound/>}></Route>    

            
            
          </Routes>
        
      </div>
    </Router>
  );
}

export default App;