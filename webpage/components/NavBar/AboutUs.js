import React from "react";
import "../CSS/about.css";
import linkedin from "./pictures/linkedin2.png";

export default function About() {
  return (
    <>
      <div className="gridsystem">
        <div className="box">
          Kai Farrell
          <a href="https://www.linkedin.com/in/kaifarrell/">
            <img src={linkedin} className="linkedin-logo"></img>
          </a>
        </div>
        <div className="box">
          Hunter Shaw
          <a href="https://www.linkedin.com/in/hunter-shaw-39430a181/">
            <img src={linkedin} className="linkedin-logo"></img>
          </a>
        </div>
        <div className="box">
          Thad White
          <a href="https://www.linkedin.com/in/thad-white/">
            <img src={linkedin} className="linkedin-logo"></img>
          </a>
        </div>
        <div className="box">
          Fabrizzio Quintanilla
          <a href="https://www.linkedin.com/in/fabrizzio-quintanilla-b58388244/">
            <img src={linkedin} className="linkedin-logo"></img>
          </a>
        </div>
        <div className="box">
          Kevin Fan
          <a href="https://www.linkedin.com/in/kfan1/">
            <img src={linkedin} className="linkedin-logo"></img>
          </a>
        </div>
      </div>
    </>
  );
}
