import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Select, Stack } from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { shuffleWordlistToBeTested } from "../Component/TestFunction";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";
import { useBackOfCardContext } from "../Context/BackOfCardContext";
import { useWordlistToBeTestedContext } from "../Context/WordlistToBeTestedContext";

const SubmitBackOfCard = (backOfCard, selectedWordlistId) => {
  const {
    wordlistToBeTested,
    setWordlistToBeTested,
  } = useWordlistToBeTestedContext();

  console.log(`pressbutton backOfCard is ${backOfCard}`);

  let path = "";
  switch (backOfCard) {
    case "meanings":
      path = `${BACKEND_URL}/words/${selectedWordlistId}`;
      break;
    case "kunReadings":
      path = `${BACKEND_URL}/words/${selectedWordlistId}/kunReadings`;
      break;
    case "onReadings":
      path = `${BACKEND_URL}/words/${selectedWordlistId}/onReadings`;
      break;
    case "nameReadings":
      path = `${BACKEND_URL}/words/${selectedWordlistId}/nameReadings`;
      break;
    default:
      // throw error or default value
      break;
  }

  axios
    .get(path)
    .then((res) => res.data)
    .then((res) => {
      if (JSON.stringify(res) === "[]") {
        alert(
          `There are no words in the wordlist selected that fit this testing criteria - please choose a different one.`
        );
      }
      console.log(`This is the wordlistToBeTested: ${JSON.stringify(res)}`);
      setWordlistToBeTested(res);
      return wordlistToBeTested;
    })
    .then((wordlistToBeTested) => {
      shuffleWordlistToBeTested(wordlistToBeTested);
      console.log(
        `This is the shuffled wordlistToBeTested ${JSON.stringify(
          wordlistToBeTested
        )}`
      );
      return wordlistToBeTested;
    })
    .catch((error) => {
      alert(`Unknown error!`);
      console.error(`Error in getting wordistToBeTested`);
    });
};
export default SubmitBackOfCard;