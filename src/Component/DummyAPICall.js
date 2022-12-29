import React, { useEffect } from "react";
import axios from "axios";

const kanjiWeb = "https://kanjiapi.dev/v1/kanji";

const DummyAPICall = () => {
  axios
    .get(`${kanjiWeb}/蛍`)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
    });
  return;
};

export default DummyAPICall;
