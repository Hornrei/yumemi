// src/PopulationChart.test.js
import React from "react";
import { render } from "@testing-library/react";
// @ts-expect-error TS(6142): Module './PopulationChart' was resolved to 'C:/Git... Remove this comment to see the full error message
import PopulationChart from "./PopulationChart";

const data = [
  { prefCode: 1, data: [{ year: 1960, value: 5000000 }] },
  { prefCode: 2, data: [{ year: 1960, value: 3000000 }] },
];

const selectedPrefectures = [1, 2];
const colorPalette = ["#8884d8", "#82ca9d"];
const prefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
];

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test("renders population chart", () => {
  const { container } = render(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <PopulationChart
      data={data}
      selectedPrefectures={selectedPrefectures}
      colorPalette={colorPalette}
      prefectures={prefectures}
    />,
  );
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(container).toMatchSnapshot();
});
