import React from "react";
import "./CSS/App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./NavBar/Homepage.js";
import NavBar from "./NavBar/NavBar";
import DocPage from "./NavBar/DocTab/Documents";
import About from "./NavBar/AboutUs";

const WebPage = () => {
  return (
    <>
    <NavBar />
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
    </>
  );
};

export default WebPage;