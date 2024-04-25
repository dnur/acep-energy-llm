import logoImage from "../acep-logo.png"
import "./Header.css"

function GithubIcon(props) {
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
export default function Header() {
    return (
        <header className="header">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <a href="https://www.uaf.edu/acep/">
                  <img alt="Logo" className="h-14 w-auto" src={logoImage} />
              </a>
              <a className="navTab" href="/">Chat</a>
              <a className="navTab" href="/about">About</a>
              <a className="navTab" href="/documentation">Documentation</a>
              <a className="flex items-center space-x-2 text-gray-600 hover:text-gray-900" href="https://github.com/dnur/acep-energy-llm" rel="noopener noreferrer" target="_blank">
                  <GithubIcon className="h-6 w-6" />
                  <span>GitHub</span>
              </a>
          </div>
        </header>
    );
}