import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const api = axios.create({
    baseURL: "https://opendata.resas-portal.go.jp",
    //実際のAPIキーに置き換える
    headers: {"X-API-KEY": ''}
});

export default api;