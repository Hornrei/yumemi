import React from "react";
import ReactDOM from "react-dom";
// @ts-expect-error TS(6142): Module './App' was resolved to 'C:/Githubprojects/... Remove this comment to see the full error message
import App from "./App";

ReactDOM.render(
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <React.StrictMode>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
