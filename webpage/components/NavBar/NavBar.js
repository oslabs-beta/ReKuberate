import React from "react";
import { useNavigate } from 'react-router-dom';
import "../CSS/Nav.css";
import wheel from "./pictures/wheel.png";


export default function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <div>
          <button onClick={() => navigate('/')}>
            <img src={wheel} alt="logo" className="nav-logo"/>
          </button>
        </div>
        <div className="nav_actions">
          <button onClick={() => navigate('/docs')}> Docs </button>
          <button onClick={() => navigate('/about')}> About Us </button>
          <a
            class="nav_link"
            href="https://medium.com/the-programmer/kubernetes-fundamentals-for-absolute-beginners-architecture-components-1f7cda8ea536"
          >
            Blog
          </a>
          <a class="nav_link" href="https://github.com/oslabs-beta/ReKuberate">
            Github
          </a>
        </div>
      </nav>
    </>
  );
}