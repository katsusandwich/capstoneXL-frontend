import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  Modal,
  TextInput,
  Stack,
} from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";

const TestPage = () => {
  let navigate = useNavigate();

  const {
    selectedWordlistId,
    setSelectedWordlistId,
  } = useSelectedWordlistIdContext();

  const {
    selectedWordlistName,
    setSelectedWordlistName,
  } = useSelectedWordlistNameContext();

  //text input box
  // const [answerEntered, setAnswerEntered] = useState("");
  const answerEntered = "hello";
  const key = "kun_readings";

  const kanji = {
    kanji: "蛍",
    meanings: ["lightning-bug", "firefly"],
    kun_readings: ["ほたる"],
    on_readings: ["ケイ"],
    name_readings: [],
  };

  //handle getTest
  const handleGetTest = (event) => {
    event.preventDefault();
    // axios
    //   .get(`https://kanjiapi.dev/v1/kanji/${wordEntered}`)
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log(`This is res of handleGetKanji ${JSON.stringify(res)}`);
    //     setWordToBeAdded(res);
    //     // console.log(`wordToBeAdded is ${JSON.stringify(wordToBeAdded)}`);　this is blank because asynchronous
    //   });
  };

  //testing function
  const testFunction = (answerEntered, key, kanji) => {
    // If the key exists in the object
    if (key in kanji) {
      // Check if the value of the key is an array
      if (Array.isArray(kanji[key])) {
        // Return true if the search string is a full and complete match for any element in the array
        return kanji[key].some((val) => val === answerEntered);
      } else {
        // Return true if the search string is a full and complete match for the value of the key
        return answerEntered === kanji[key];
      }
    }
    // Otherwise, return false
    return false;
  };

  //useEffect

  useEffect(() => {
    console.log(testFunction(answerEntered, key, kanji));
  }, []);

  return (
    <Stack
      align="flex-start"
      justify="flex-start"
      sx={() => ({
        height: 844,
      })}
      className="testDiv"
    >
      <div>
        <Container className="testHeader" fluid>
          Test in Progress: {selectedWordlistName}
        </Container>
        <Container>
          <form>
            <input
              type="text"
              value={answerEntered}
              onChange={(e) => {
                console.log(`answerEntered in input is ${e.target.value}`);
                // setAnswerEntered(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={(event) => {
                handleGetTest(event);
              }}
              className="testButton"
              value="Check answer"
            >
              Check answer
            </button>
          </form>
        </Container>
      </div>
    </Stack>
  );
};

export default TestPage;
