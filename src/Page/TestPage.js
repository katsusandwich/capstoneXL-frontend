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
  const [answerEntered, setAnswerEntered] = useState("");
  const key = "kun_readings";

  const word = {
    kanji: "蛍",
    meanings: ["lightning-bug", "firefly"],
    kun_readings: ["ほたる"],
    on_readings: ["ケイ"],
    name_readings: [],
  };

  //testing function
  const testFunction = (answerEntered, key, word) => {
    // If the key exists in the object
    if (key in word) {
      // Check if the value of the key is an array
      if (Array.isArray(word[key])) {
        // Return true if the search string is a full and complete match for any element in the array
        return word[key].some((val) => val === answerEntered);
      } else {
        // Return true if the search string is a full and complete match for the value of the key
        return answerEntered === word[key];
      }
    }
    // Otherwise, return false
    return false;
  };

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
                setAnswerEntered(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => {
                testFunction(answerEntered, key, word);
                console.log(testFunction(answerEntered, key, word));
                setAnswerEntered("");
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
