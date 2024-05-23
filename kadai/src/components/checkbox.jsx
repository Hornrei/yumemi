import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PrefectureCheckboxes = ({
  apiKey,
  onSelectionChange,
  onPrefecturesFetched,
}) => {
  const [prefectures, setPrefectures] = useState([])
  const [selectedPrefectures, setSelectedPrefectures] = useState({})

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await axios.get(
          'https://opendata.resas-portal.go.jp/api/v1/prefectures',
          {
            headers: {
              'X-API-KEY': '',
            },
          }
        )
        setPrefectures(response.data.result)
        onPrefecturesFetched(response.data.result) // 都道府県データを親コンポーネントに渡す
      } catch (error) {
        console.error('Error fetching prefectures:', error)
      }
    }

    fetchPrefectures()
  }, [apiKey, onPrefecturesFetched])

  const handleCheckboxChange = (prefCode) => {
    setSelectedPrefectures((prevSelected) => {
      const newSelected = {
        ...prevSelected,
        [prefCode]: !prevSelected[prefCode],
      }
      onSelectionChange(newSelected)
      return newSelected
    })
  }

  return (
    <div>
      {prefectures.map((prefecture) => (
        <label key={prefecture.prefCode}>
          <input
            type="checkbox"
            value={prefecture.prefCode}
            checked={!!selectedPrefectures[prefecture.prefCode]}
            onChange={() => handleCheckboxChange(prefecture.prefCode)}
          />
          {prefecture.prefName}
        </label>
      ))}
    </div>
  )
}

export default PrefectureCheckboxes
