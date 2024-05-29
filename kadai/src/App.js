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
import './App.css'

const apiKey = process.env.REACT_APP_API_KEY

const regions = {
  '北海道地方': ['北海道'],
  '東北地方': ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  '関東地方': ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  '中部地方': ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  '近畿地方': ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  '中国地方': ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  '四国地方': ['徳島県', '香川県', '愛媛県', '高知県'],
  '九州地方': ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
}


export default function App() {
  const [prefectures, setPrefectures] = useState([])
  const [populationData, setPopulationData] = useState([])
  const [selectedPrefectures, setSelectedPrefectures] = useState([])
  const [ageGroup, setAgeGroup] = useState('総人口')
  const [loading, setLoading] = useState(true)

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
    
    //選択したagegroupの値を取得
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

            let n;
            if (ageGroup === '総人口') {
              n = 0
            }else if (ageGroup === '年少人口') {
              n = 1
            }else if (ageGroup === '生産年齢人口') {
              n = 2
            } else if (ageGroup === '老年人口') {
              n = 3
            }

            allPopulationData.push({
              prefCode,
              data: res.data.result.data[n].data,
            })

          }
        setPopulationData(allPopulationData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPopulationData()
  }, [selectedPrefectures, ageGroup, loading ])



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
  
  // 起動時に1回だけ実行
  useEffect(() => {
    if (!loading) return
    console.log("初回だけ")
    setLoading(false)
  }, [loading])



  return (
    <>
      <header className="header">
        <h1 className="header__title">都道府県別の総人口推移グラフ</h1>
      </header>
      <div className="wrapper">

        <h2>都道府県</h2>
        <div className="tihou_container"> 
          {Object.keys(regions).map((region) => (
            <div key={region} className='tihou'>
              <h3>{region}</h3>
              <div className="prefecture__container">
                {prefectures
                  .filter((pref) => regions[region].includes(pref.prefName))
                  .map((prefecture) => (
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
            </div>
          
          ))}
        </div> {/* end tihou_container */}

        <h2>年齢層選択</h2>
        <div>
          <input
            type="radio"
            id="total"
            name="ageGroup"
            value="総人口"
            checked={ageGroup === '総人口'}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
          <label htmlFor="total">総人口</label>
          <input
            type="radio"
            id="oldAge"
            name="ageGroup"
            value="老年人口"
            checked={ageGroup === '老年人口'}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
          <label htmlFor="oldAge">老年人口</label>
          <input
            type="radio"
            id="workingAge"
            name="ageGroup"
            value="生産年齢人口"
            checked={ageGroup === '生産年齢人口'}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
          <label htmlFor="workingAge">生産年齢人口</label>
          <input
            type="radio"
            id="youngAge"
            name="ageGroup"
            value="年少人口"
            checked={ageGroup === '年少人口'}
            onChange={(e) => setAgeGroup(e.target.value)}
          />
          <label htmlFor="youngAge">年少人口</label>
        </div>
        
        <h2>人口数</h2>
        {formattedData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
              // カンマを付ける
              tickFormatter={value => value.toLocaleString()}
              />
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
