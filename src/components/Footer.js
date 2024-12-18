import React from "react";
// import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router";
import { checkToken } from "../api/storage";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer pt-5">
      <div className="container">
        <div className="topFooter pb-4">
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
            {/* <img src={logo} alt="" /> */}
          </div>
          <ul>
            <li>
              <a href="##">About</a>
            </li>
            <li>
              <a href="##">Privacy Policy</a>
            </li>
            <li>
              <a href="##">Licensing</a>
            </li>
            <li>
              <a href="##">Contact</a>
            </li>
          </ul>
        </div>
        <p className="text-center pb-3 pt-4">
          &copy; CODED<sup>TM</sup>. All Rights Reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
