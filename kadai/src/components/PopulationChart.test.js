// src/PopulationChart.test.js
import React from "react";
import { render } from "@testing-library/react";
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

test("renders population chart", () => {
  const { container } = render(
    <PopulationChart
      data={data}
      selectedPrefectures={selectedPrefectures}
      colorPalette={colorPalette}
      prefectures={prefectures}
    />,
  );
  expect(container).toMatchSnapshot();
});
