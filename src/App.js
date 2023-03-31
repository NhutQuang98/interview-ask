import React from "react";
// import axios from "axios";
import './App.css';
// import Header from "./common/header";
// import Footer from "./common/footer";
import Login from "./webApp/account/login/Login";
import Dashboard from "./webApp/dashboard/Dashboard";
// import Dashboard from "./component/dashboard/Dashboard";
// import Home from "./component/home/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        {/* <div className="auth-wrapper"> */}
        {/* <div className="auth-inner"> */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
        </Routes>
      </div>
      {/* </div> */}
      {/* </div> */}
    </Router>
  );
}

export default App;