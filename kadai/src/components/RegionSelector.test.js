// src/RegionSelector.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import RegionSelector from "./RegionSelector";

const prefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  // Add other prefectures as needed
];

const selectedPrefectures = [1];
const onCheckboxChange = jest.fn();

test("renders region selector", () => {
  render(
    <RegionSelector
      prefectures={prefectures}
      selectedPrefectures={selectedPrefectures}
      onCheckboxChange={onCheckboxChange}
    />,
  );

  const regionElement = screen.getByText(/北海道地方/i);
  expect(regionElement).toBeInTheDocument();
});
