import React from "react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { PiTextColumnsFill } from "react-icons/pi";


const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list">
        <li className="bottom-nav-item">
          <Link to="/" className="bottom-nav-link"><MdHome /></Link>
        </li>
        <li className="bottom-nav-item">
          <Link to="/summary" className="bottom-nav-link"><PiTextColumnsFill /></Link>
        </li>
        <li className="bottom-nav-item">
          <Link to="/settings" className="bottom-nav-link"><IoMdSettings /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
