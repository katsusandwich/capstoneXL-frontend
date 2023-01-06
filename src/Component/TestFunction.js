import React from "react";
// import axios from "axios";
import { Container, Table } from "@mantine/core";
import "../CSS/listMakingPage.css";
// import { useNavigate } from "react-router";
// import { BACKEND_URL, word, backOfCard } from "../constants";
// import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
// import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";

export const TestFunction = (answerEntered, word, backOfCard) => {
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

export const ResultFunction = (TestFunction, userHand, backOfCard) => {
  if (TestFunction === true) {
    return `You got it! ${userHand.kanji} ${userHand.backOfCard}`;
  } else {
    return `Gotta revise that Kanji! ${userHand.kanji} ${userHand.backOfCard}`;
  }
};

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
