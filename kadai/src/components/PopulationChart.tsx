// PopulationChart.js
import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PopulationChart({
  data,
  selectedPrefectures,
  colorPalette,
  prefectures,
}) {
  const defaultYear = [
    { year: "1960" },
    { year: "1965" },
    { year: "1970" },
    { year: "1975" },
    { year: "1980" },
    { year: "1985" },
    { year: "1990" },
    { year: "1995" },
    { year: "2000" },
    { year: "2005" },
    { year: "2010" },
    { year: "2015" },
    { year: "2020" },
    { year: "2025" },
    { year: "2030" },
    { year: "2035" },
    { year: "2040" },
    { year: "2045" },
  ];

  const formattedData = data.reduce((acc, { prefCode, data }) => {
    data.forEach((item, index) => {
      if (!acc[index]) {
        acc[index] = { year: item.year };
      }
      acc[index][prefectures[prefCode - 1].prefName] = item.value;
    });
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData.length > 0 ? formattedData : defaultYear}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(value) => value.toLocaleString()} />
        <Tooltip />
        <Legend verticalAlign="top" />
        {formattedData.length > 0 &&
          selectedPrefectures.map((prefCode, index) => {
            const prefName = prefectures[prefCode - 1].prefName;
            return (
              <Line
                key={prefCode}
                type="monotone"
                dataKey={prefName}
                name={prefName}
                stroke={colorPalette[index % colorPalette.length]}
                activeDot={{ r: 8 }}
              />
            );
          })}
      </LineChart>
    </ResponsiveContainer>
  );
}

PopulationChart.propTypes = {
  data: PropTypes.array.isRequired,
  selectedPrefectures: PropTypes.array.isRequired,
  colorPalette: PropTypes.array.isRequired,
  prefectures: PropTypes.array.isRequired,
};

export default PopulationChart;
