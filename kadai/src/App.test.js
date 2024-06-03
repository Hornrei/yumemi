// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const headerElement = screen.getByText(/都道府県別の人口推移グラフ/i);
  expect(headerElement).toBeInTheDocument();
});
