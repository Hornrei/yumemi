// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
// @ts-expect-error TS(6142): Module './App' was resolved to 'C:/Githubprojects/... Remove this comment to see the full error message
import App from "./App";

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test("renders header", () => {
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  render(<App />);
  const headerElement = screen.getByText(/都道府県別の人口推移グラフ/i);
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(headerElement).toBeInTheDocument();
});
