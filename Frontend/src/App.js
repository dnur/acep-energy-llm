import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import ComponentPage from "./pages/home/HomePage";




// Main App component
function App() {
  return ( 
    <div className="App">
        <div className="page">
            <Routes>
                <Route path="/" element={<ComponentPage/>} />
            </Routes>
        </div>
    </div>
  );
}


export default App;
