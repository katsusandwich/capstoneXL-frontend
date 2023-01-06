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
import {
  TestFunction,
  shuffleWordlistToBeTested,
} from "../Component/TestFunction";

const TestPage = () => {
  let navigate = useNavigate();

  //alert box for Mantine Modal
  const [opened, setOpened] = useState(false);

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

  ///deal a wordcard to the user's hand
  const [userHand, setUserHand] = useState([]);

  //display the wordcard to user in a modal
  //wordcard contains the text box to carry out the test function
  //user does test and it will show the result for that particular word based on whether it's true or false
  //click 'next question' and it will display the next word
  //whenwordlisttobetested is empty show the overall score
  //then go back to the main screen

  const dealWordCardToUserHandAndPrint = async (e) => {
    e.preventDefault();
    try {
      await setUserHand(wordlistToBeTested.pop());
      setOpened(true);
      console.log(userHand);
    } catch (e) {
      console.log(e);
    }
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
        <Container>
          <Button onClick={() => navigate("/TestFormatPage")}>
            Choose different test format
          </Button>
        </Container>

        <Container className="testHeader" fluid>
          Test in Progress: {selectedWordlistName} {backOfCard}
        </Container>
        <Button
          onClick={(e) => {
            dealWordCardToUserHandAndPrint(e);
          }}
        >
          Draw a Flashcard
        </Button>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          title="Test thyself"
        >
          {userHand.kanji}
        </Modal>

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
