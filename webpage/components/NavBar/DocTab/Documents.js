import React from "react";
import "./docs.css";
import Intro from "./introduction";
import SideBar from "./sidebar";

export default function DocPage() {
  return (
    <>
        <SideBar/>
        <div className="docs__content">
          <Intro />
        </div>
    </>
  );
}
