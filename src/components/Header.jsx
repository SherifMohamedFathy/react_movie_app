import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="content">
      <div className="header container align-items-center flex-column flex-md-row">
        <h1>
          <Link to={"/watchList"}>Movies</Link>
        </h1>
        <ul className="links">
          <Link to={"watchList"}>Watch List</Link>
          <Link to={"watched"}>Watched</Link>
          <Link to={"/"}>Add</Link>
        </ul>
      </div>
    </div>
  );
}
