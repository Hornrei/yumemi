import React, { useState, useEffect } from 'react'

import axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const apiKey = process.env.REACT_APP_API_KEY

export default function App() {
  const [prefectures, setPrefectures] = useState([])
  const [populationData, setPopulationData] = useState([])
  const [selectedPrefectures, setSelectedPrefectures] = useState([])

  // 47都道府県を配列に格納
  const allPrefectures = prefectures.map((prefecture) => prefecture.prefName)
  const newAllPrefectures = [...new Set(allPrefectures)] // 重複を削除

  // 都道府県一覧を取得
  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        // APIキー
        headers: { 'X-API-KEY': apiKey },
      })
      .then((res) => {
        setPrefectures(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // 人口構成データの取得
  useEffect(() => {
    if (selectedPrefectures.length === 0) return

    const fetchPopulationData = async () => {
      try {
        const allPopulationData = []
        for (const prefCode of selectedPrefectures) {
          const res = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
            {
              // APIキー
              headers: {
                'X-API-KEY': apiKey,
              },
            }
          )
          allPopulationData.push({
            prefCode,
            data: res.data.result.data[0].data,
          })
        }
        setPopulationData(allPopulationData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPopulationData()
  }, [selectedPrefectures])

  // チェックボタンの操作
  const handleCheckbox = (prefCode) => {
    const isChecked = !selectedPrefectures.includes(prefCode)
    if (isChecked) {
      setSelectedPrefectures((prevState) => [...prevState, prefCode])
    } else {
      setSelectedPrefectures((prevState) =>
        prevState.filter((code) => code !== prefCode)
      )
    }
  }

  // Recharts用のデータフォーマットに変換
  const formattedData = populationData.reduce((acc, { prefCode, data }) => {
    data.forEach((item, index) => {
      if (!acc[index]) {
        acc[index] = { year: item.year }
      }
      acc[index][newAllPrefectures[prefCode - 1]] = item.value
    })
    return acc
  }, [])

  return (
    <>
      <header className="header">
        <h1 className="header__title">都道府県別の総人口推移グラフ</h1>
      </header>
      <div className="wrapper">
        <h2>都道府県</h2>
        <div className="prefecture__container">
          {prefectures.map((prefecture) => (
            <div key={prefecture.prefCode} className="prefecture__item">
              <input
                className="prefecture__input"
                type="checkbox"
                id={`checkbox-${prefecture.prefCode}`}
                name={prefecture.prefName}
                onChange={() => handleCheckbox(prefecture.prefCode)}
              />
              <label
                className="prefecture__label"
                htmlFor={`checkbox-${prefecture.prefCode}`}
              >
                {prefecture.prefName}
              </label>
            </div>
          ))}
        </div>
        <h2>人口数</h2>
        {formattedData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedPrefectures.map((prefCode) => {
                const prefName = newAllPrefectures[prefCode - 1]
                return (
                  <Line
                    key={prefCode}
                    type="monotone"
                    dataKey={prefName}
                    name={prefName}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  )
}
