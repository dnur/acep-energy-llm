import React, { useState } from 'react';
import logoImage from "../../images/acep-logo.png";
import "./Header.css";
import { slide as Menu } from 'react-burger-menu';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

const Header: React.FC = () => {
    const [isOpen] = useState(false);

    return (
        <header className="header">
            <a href="https://www.uaf.edu/acep/">
                <img alt="Logo" className="logo" src={logoImage} />
            </a>
            <Menu isOpen={isOpen} width={ '300px' } right>
                <a className="navTab" href="/">Chat</a>
                <a className="navTab" href="/about">About</a>
                <a className="navTab" href="/documentation">Documentation</a>
                <a className="navTab" href="https://github.com/dnur/acep-energy-llm" rel="noopener noreferrer" target="_blank">
                  <GithubIcon className="githubIcon" />
                </a>
            </Menu>
        </header>
    );
}

export default Header;
