// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import RegionSelector from "./components/RegionSelector";
import AgeGroupSelector from "./components/AgeGroupSelector";
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
            data: res.data.result.data[n].data,
          });
        }
        setPopulationData(allPopulationData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPopulationData();
  }, [selectedPrefectures, ageGroup]);

  const handleCheckboxChange = (prefCode) => {
    const isChecked = !selectedPrefectures.includes(prefCode);
    if (isChecked) {
      setSelectedPrefectures((prevState) => [...prevState, prefCode]);
    } else {
      setSelectedPrefectures((prevState) =>
        prevState.filter((code) => code !== prefCode),
      );
    }
  };

  const handleReset = () => setSelectedPrefectures([]);

  return (
    <>
      <Header />
      <div className="wrapper">
        <RegionSelector
          prefectures={prefectures}
          selectedPrefectures={selectedPrefectures}
          onCheckboxChange={handleCheckboxChange}
        />
        <button onClick={handleReset} className="reset_btn">
          選択リセット
        </button>
        <AgeGroupSelector ageGroup={ageGroup} onAgeGroupChange={setAgeGroup} />
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
