import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Container, Table } from "@mantine/core";
import "../CSS/listMakingPage.css";
// import { useNavigate } from "react-router";
// import { BACKEND_URL, word, backOfCard } from "../constants";
// import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
// import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";
import { useIndividualQuestionResultContext } from "../Context/IndividualQuestionResultContext";

export const TestFunction = (answerEntered, word, backOfCard) => {
  // const {
  //   individualQuestionResult,
  //   setIndividualQuestionResult,
  // } = useIndividualQuestionResultContext();

  //   // Check if the value of the key is an array

  if (Array.isArray(word[backOfCard])) {
    // Return true if the search string is a full and complete match for any element in the array
    // setIndividualQuestionResult(true);
    return word[backOfCard].some((val) => val === answerEntered);
  } else {
    // Return true if the search string is a full and complete match for the value of the key
    // setIndividualQuestionResult(false);
    return answerEntered === word[backOfCard];
  }
};

// export const ResultFunction = (individualQuestionResult, userHand) => {
//   if (individualQuestionResult === true) {
//     return `You got it! ${userHand.kanji} ${userHand.meanings} ${userHand.kunReadings} ${userHand.onReadings}  ${userHand.nameReadings}`;
//   } else {
//     return `Gotta revise that Kanji! ${userHand.kanji} ${userHand.backOfCard}`;
//   }
// };

export var shuffleWordlistToBeTested = function(wordlistToBeTested) {
  const getRandomIndex = function(size) {
    return Math.floor(Math.random() * size);
  };

  var index = 0;

  while (index < wordlistToBeTested.length) {
    var randomIndex = getRandomIndex(wordlistToBeTested.length);

    var currentItem = wordlistToBeTested[index];

    var randomItem = wordlistToBeTested[randomIndex];

    wordlistToBeTested[index] = randomItem;
    wordlistToBeTested[randomIndex] = currentItem;

    index = index + 1;
  }

  return wordlistToBeTested;
};
