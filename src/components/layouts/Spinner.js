import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div>
      <img
        style={{ width: "50px", margin: "auto", display: "block" }}
        src={spinner}
        alt="...loading"
      />
    </div>
  );
}
