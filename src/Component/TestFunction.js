import React from "react";
// import axios from "axios";
import { Container, Table } from "@mantine/core";
import "../CSS/listMakingPage.css";
// import { useNavigate } from "react-router";
// import { BACKEND_URL, word, backOfCard } from "../constants";
// import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
// import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";

const TestFunction = (answerEntered, word, backOfCard) => {
  // //testing function that does not take in backOfCard
  //   // Check if the value of the key is an array
  if (Array.isArray(word[backOfCard])) {
    // Return true if the search string is a full and complete match for any element in the array
    return word[backOfCard].some((val) => val === answerEntered);
  } else {
    //     // Return true if the search string is a full and complete match for the value of the key
    return answerEntered === word[backOfCard];
  }
};

export default TestFunction;
