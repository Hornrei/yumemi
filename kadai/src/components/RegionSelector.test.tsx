// src/RegionSelector.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
// @ts-expect-error TS(6142): Module './RegionSelector' was resolved to 'C:/Gith... Remove this comment to see the full error message
import RegionSelector from "./RegionSelector";

const prefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 47, prefName: "沖縄県" },
];

const selectedPrefectures = [1];
// @ts-expect-error TS(2708): Cannot use namespace 'jest' as a value.
const onCheckboxChange = jest.fn();

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test("renders region selector", () => {
  render(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <RegionSelector
      prefectures={prefectures}
      selectedPrefectures={selectedPrefectures}
      onCheckboxChange={onCheckboxChange}
    />,
  );

  const regionElement = screen.getByText(/北海道地方/i);
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(regionElement).toBeInTheDocument();
});
