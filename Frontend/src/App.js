import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import ComponentPage from "./pages/home/HomePage";
import AboutPage from "./pages/about/About";




// Main App component
function App() {
  return (
    <div className="App">
        <div className="page">
            <Routes>
                <Route path="/" element={<ComponentPage/>} />
                <Route path="/about" element={<AboutPage/>} />
            </Routes>
        </div>
    </div>
  );
}


export default App;
