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
import { BACKEND_URL, word, backOfCard } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";
import TestFunction from "../Component/TestFunction";

// import { useBackOfCardContext } from "../Context/BackOfCardContext";

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

  // const { backOfCard, setBackOfCard } = useBackOfCardContext();

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
