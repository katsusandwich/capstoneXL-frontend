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
import { BACKEND_URL, word } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";
import { useBackOfCardContext } from "../Context/BackOfCardContext";
import { useWordlistToBeTestedContext } from "../Context/WordlistToBeTestedContext";

import TestFunction from "../Component/TestFunction";

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

  const { backOfCard, setBackOfCard } = useBackOfCardContext();

  const {
    wordlistToBeTested,
    setWordlistToBeTested,
  } = useWordlistToBeTestedContext();

  //text input box
  const [answerEntered, setAnswerEntered] = useState("");

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
        <Container>
          <Button onClick={() => navigate("/TestFormatPage")}>
            Choose different test format
          </Button>
        </Container>

        <Container className="testHeader" fluid>
          Test in Progress: {selectedWordlistName} {backOfCard}
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
                TestFunction(answerEntered, word, backOfCard);
                console.log(
                  `The result of TestFunction is ${TestFunction(
                    answerEntered,
                    word,
                    backOfCard
                  )}`
                );
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
