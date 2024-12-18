import React, { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { checkToken } from "../api/storage";
import { logout } from "../api/auth";
const Header = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const toggleMenuAction = () =>
    menuRef.current.classList.toggle("active_menu");
  return (
    <header className="header">
      <div className="container-fluid">
        {/* {checkToken() ? ( */}
        <div className="headerContainer">
          <div
            className="logo"
            style={{
              cursor: checkToken ? " pointer" : "default",
              fontSize: "24px",
              fontWeight: "bold",
            }}
            onClick={() => (checkToken ? navigate("/") : "")}
          >
            restaurant
          </div>
          <nav
            className="navbar navigation"
            ref={menuRef}
            onClick={toggleMenuAction}
          >
            <ul className="menu_nav" onClick={(e) => e.stopPropagation()}>
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  onClick={() => {
                    toggleMenuAction();
                    window.scrollTo(0, 0);
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/recipes"}
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  onClick={() => {
                    toggleMenuAction();
                    window.scrollTo(0, 0);
                  }}
                >
                  Recipes
                </NavLink>
              </li>
              {checkToken() && (
                <>
                  <li>
                    <NavLink
                      to={"/categories"}
                      className={({ isActive }) =>
                        isActive ? "activeLink" : ""
                      }
                      onClick={() => {
                        toggleMenuAction();
                        window.scrollTo(0, 0);
                      }}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/ingredients"}
                      className={({ isActive }) =>
                        isActive ? "activeLink" : ""
                      }
                      onClick={() => {
                        toggleMenuAction();
                        window.scrollTo(0, 0);
                      }}
                    >
                      Ingredients
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="d-flex align-items-center gap-3">
            {checkToken() ? (
              <button
                className="logoutButton"
                onClick={async () => {
                  await logout();
                  await navigate("/login");
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-warning">
                Login
              </Link>
            )}
            <div className="menu" onClick={toggleMenuAction}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 50 50"
                fill="var(--text-color)"
              >
                <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
              </svg>
            </div>
          </div>
        </div>
        {/* ) : (
          <div className="headerContainer">
            <div
              className="logo"
              style={{
                cursor: checkToken ? " pointer" : "default",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              onClick={() => (checkToken ? navigate("/") : "")}
            >
              restaurant
            </div>
            <nav
              className="navbar navigation"
              ref={menuRef}
              onClick={toggleMenuAction}
            >
              <ul className="menu_nav" onClick={(e) => e.stopPropagation()}>
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    onClick={() => {
                      toggleMenuAction();
                      window.scrollTo(0, 0);
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/recipes"}
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    onClick={() => {
                      toggleMenuAction();
                      window.scrollTo(0, 0);
                    }}
                  >
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/categories"}
                    className={({ isActive }) => (isActive ? "activeLink" : "")}
                    onClick={() => {
                      toggleMenuAction();
                      window.scrollTo(0, 0);
                    }}
                  >
                    Categories
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="d-flex align-items-center gap-3">
              <button
                className="logoutButton"
                onClick={async () => {
                  await logout();
                  await navigate("/register");
                }}
              >
                Logout
              </button>
              <div className="menu" onClick={toggleMenuAction}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 50 50"
                  fill="var(--text-color)"
                >
                  <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
                </svg>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </header>
  );
};

export default Header;
