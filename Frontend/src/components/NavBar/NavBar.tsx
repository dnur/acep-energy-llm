import React, { useState } from 'react';
import logoImage from "../../images/acep-logo.png";
import "./NavBar.css";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

const NavBar = () => {

  // To change burger classes after click
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
  const [menu_class, setMenuClass] = useState("menu hidden")
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  // Toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked")
      setMenuClass("menu visable")
    } else {
      setBurgerClass("burger-bar unclicked")
      setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }

  return (
    <div className="navbar">
      <nav>
        {/* Buger icon consisting of three div bar */}
        <div>
          <div className="burger-menu" onClick={updateMenu}>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
          </div>
        </div>

        <div className="logo">
          <a href="https://www.uaf.edu/acep/" rel="noopener noreferrer" target="_blank">
            <img alt="Logo" className="logo" src={logoImage} />
          </a>
        </div>

        <a className="github-icon" href="https://github.com/dnur/acep-energy-llm" rel="noopener noreferrer" target="_blank">
          <GithubIcon />
        </a>
      </nav>

      {/* Menu content */}
      <div className={menu_class}>
        <a className="nav-tab" href="/">Chat</a> <br></br>
        <a className="nav-tab" href="/about">About</a> <br></br>
        <a className="nav-tab" href="/documentation">Documentation</a> <br></br>
      </div>
    </div>
  );
}

export default NavBar;