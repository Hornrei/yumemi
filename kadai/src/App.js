


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './axios';


const requests = {
  pref: '/api/v1/prefectures',
  pyramid: '/api/v1/population/composition/pyramid',
}

function App() {
  const [code, setCode] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(requests.pref);
      setCode(response.data); // レスポンスデータをセットする
    }
    fetchData();
  }, []);

  return (
    <div className='app'>
      <h1>都道府県コード</h1>
      <p>{JSON.stringify(code)}</p> {/* JSON.stringify()を使ってオブジェクトを文字列に変換 */}
    </div>
  )
}

export default App;
