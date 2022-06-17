import style from "../styles/Header.module.css";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") setMode("dark");
    else setMode("light");
  };

  return (
    <nav className={`${style.navbarWrapper} navbar navbar-dark bg-dark`}>
      <div className="container-fluid">
        <h1 className="navbar-brand">IMDb but better</h1>
        <div className={style.navRhs}>
          <form class="d-flex" role="search">
            <input
              className={`${style.searchBar} form-control me-2`}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <FaSearch color="white" size={20} />
          </form>
          <div className={style.modeToggler} onClick={toggleMode}>
            {mode === "light" ? (
              <FaSun color="white" size={20} />
            ) : (
              <FaMoon color="white" size={20} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
