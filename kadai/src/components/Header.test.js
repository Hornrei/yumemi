// src/Header.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders header title", () => {
  render(<Header />);
  const headerElement = screen.getByText(/都道府県別の人口推移グラフ/i);
  expect(headerElement).toBeInTheDocument();
});
