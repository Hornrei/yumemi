// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// @ts-expect-error TS(6142): Module './components/Header' was resolved to 'C:/G... Remove this comment to see the full error message
import Header from "./components/Header";
// @ts-expect-error TS(6142): Module './components/RegionSelector' was resolved ... Remove this comment to see the full error message
import RegionSelector from "./components/RegionSelector";
// @ts-expect-error TS(6142): Module './components/AgeGroupSelector' was resolve... Remove this comment to see the full error message
import AgeGroupSelector from "./components/AgeGroupSelector";
// @ts-expect-error TS(6142): Module './components/PopulationChart' was resolved... Remove this comment to see the full error message
import PopulationChart from "./components/PopulationChart";

const apiKey = process.env.REACT_APP_API_KEY;

export default function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [populationData, setPopulationData] = useState([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState([]);
  const [ageGroup, setAgeGroup] = useState("総人口");

  const colorPalette = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#d0ed57",
    "#a4de6c",
    "#8dd1e1",
    "#d0ed57",
    "#83a6ed",
    "#8e4585",
  ];

  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": apiKey },
      })
      .then((res) => setPrefectures(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedPrefectures.length === 0) return;

    const fetchPopulationData = async () => {
      try {
        const allPopulationData = [];
        for (const prefCode of selectedPrefectures) {
          const res = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
            {
              headers: { "X-API-KEY": apiKey },
            },
          );

          let n;
          if (ageGroup === "総人口") n = 0;
          else if (ageGroup === "年少人口") n = 1;
          else if (ageGroup === "生産年齢人口") n = 2;
          else if (ageGroup === "老年人口") n = 3;

          allPopulationData.push({
            prefCode,
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            data: res.data.result.data[n].data,
          });
        }
        // @ts-expect-error TS(2345): Argument of type '{ prefCode: never; data: any; }[... Remove this comment to see the full error message
        setPopulationData(allPopulationData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPopulationData();
  }, [selectedPrefectures, ageGroup]);

  const handleCheckboxChange = (prefCode: any) => {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    const isChecked = !selectedPrefectures.includes(prefCode);
    if (isChecked) {
      // @ts-expect-error TS(2345): Argument of type '(prevState: never[]) => any[]' i... Remove this comment to see the full error message
      setSelectedPrefectures((prevState) => [...prevState, prefCode]);
    } else {
      setSelectedPrefectures((prevState) =>
        prevState.filter((code) => code !== prefCode),
      );
    }
  };

  const handleReset = () => setSelectedPrefectures([]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="wrapper">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RegionSelector
          prefectures={prefectures}
          selectedPrefectures={selectedPrefectures}
          onCheckboxChange={handleCheckboxChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button onClick={handleReset} className="reset_btn">
          選択リセット
        </button>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <AgeGroupSelector ageGroup={ageGroup} onAgeGroupChange={setAgeGroup} />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <PopulationChart
          data={populationData}
          selectedPrefectures={selectedPrefectures}
          colorPalette={colorPalette}
          prefectures={prefectures}
        />
      </div>
    </>
  );
}
