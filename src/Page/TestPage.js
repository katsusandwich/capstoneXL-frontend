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
import { useBackOfCardContext } from "../Context/BackOfCardContext";
import { useWordlistToBeTestedContext } from "../Context/WordlistToBeTestedContext";
// import { useIndividualQuestionResultContext } from "../Context/IndividualQuestionResultContext";
import {
  TestFunction,
  // ResultFunction,
  shuffleWordlistToBeTested,
} from "../Component/TestFunction";

const TestPage = () => {
  let navigate = useNavigate();

  //alert box for Mantine Modal for question
  const [openedQuestion, setOpenedQuestion] = useState(false);

  //alert box for Mantine Modal for result
  const [openedResult, setOpenedResult] = useState(false);

  //alert box for Mantine Modal for score
  const [openedScore, setOpenedScore] = useState(false);

  //get contexts
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

  //individualQuestionResult code

  const [individualQuestionResult, setIndividualQuestionResult] = useState();

  // const {
  //   individualQuestionResult,
  //   setIndividualQuestionResult,
  // } = useIndividualQuestionResultContext();

  // //set default result
  // useEffect(() => {
  //   setIndividualQuestionResult(true);
  // }, []);

  //text input box
  const [answerEntered, setAnswerEntered] = useState("");

  ///deal a wordcard to the user's hand
  const [userHand, setUserHand] = useState([]);

  //dealWordCardToUser

  const dealWordCardToUserHand = async (e) => {
    e.preventDefault();
    try {
      await setUserHand(wordlistToBeTested.pop());
      console.log(userHand);
      setOpenedQuestion(true);
    } catch (e) {
      console.log(e);
    }
  };

  //result function
  const resultFunction = (userHand) => {
    if (individualQuestionResult === true) {
      return `You got it! ${JSON.stringify(userHand)}`;
    } else {
      return `Gotta revise that Kanji! ${userHand.kanji} ${userHand.meanings}`;
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
            dealWordCardToUserHand(e);
          }}
        >
          Draw a Flashcard
        </Button>
        <Modal
          opened={openedQuestion}
          onClose={() => {
            setOpenedQuestion(false);
          }}
          title="Test thyself"
        >
          What is the {backOfCard} of {userHand.kanji}？
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
                  answerEntered === ""
                    ? alert(`Please at least try to answer`)
                    : TestFunction(answerEntered, userHand, backOfCard);
                  console.log(
                    `The result of TestFunction is ${TestFunction(
                      answerEntered,
                      userHand,
                      backOfCard
                    )}`
                  );
                  // setIndividualQuestionResult(
                  //   TestFunction(answerEntered, userHand, backOfCard)
                  // );
                  TestFunction(answerEntered, userHand, backOfCard)
                    ? setIndividualQuestionResult(true)
                    : setIndividualQuestionResult(false);
                  setOpenedResult(true);
                  setAnswerEntered("");
                }}
                className="testButton"
                value="Check answer"
              >
                Test thyself
              </button>
            </form>
          </Container>
        </Modal>
        <Modal
          opened={openedResult}
          onClose={() => {
            setOpenedResult(false);
          }}
          title="See thine result here"
        >
          {resultFunction(userHand)}
          <Container>
            <form>
              <button
                type="button"
                onClick={(e) => {
                  dealWordCardToUserHand(e);
                  setOpenedResult(false);
                  setOpenedQuestion(true);
                }}
                className="testButton"
                value="Next Question"
              >
                Next Question
              </button>
            </form>
          </Container>
        </Modal>
      </div>
    </Stack>
  );
};

export default TestPage;
