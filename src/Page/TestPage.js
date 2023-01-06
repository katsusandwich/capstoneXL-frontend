import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  Modal,
  TextInput,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
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

  const dealWordCardToUserHand = async (e) => {
    e.preventDefault();
    if (wordlistToBeTested.length > 0) {
      await setUserHand(wordlistToBeTested.pop());
      console.log(userHand);
    } else setUserHand("");
  };

  //useEffect

  useEffect(() => {
    if (userHand === "") {
      setOpenedScore(true);
    } else {
      setOpenedQuestion(true);
    }
  }, [userHand]);

  const resultFunction = (userHand) => {
    if (individualQuestionResult === true) {
      return (
        <div>
          <p>You got it!</p>
          <p>
            <Text fw={5000} size="100px" ta="center">
              {userHand.kanji}
            </Text>
            <p>meaning: {userHand.meanings} </p>
            <p>
              kun:
              {userHand.kunReadings}
            </p>
            <p>on: {userHand.onReadings} </p>{" "}
            <p>
              name:
              {userHand.nameReadings}
            </p>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Better luck next time - revise that Kanji!</p>
          <p>
            <p>
              <Text fw={5000} size="100px" ta="center">
                {userHand.kanji}
              </Text>
            </p>
            <p>meaning: {userHand.meanings} </p>
            <p>
              kun:
              {userHand.kunReadings}
            </p>
            <p>on: {userHand.onReadings} </p>{" "}
            <p>
              name:
              {userHand.nameReadings}
            </p>
          </p>
        </div>
      );
    }
  };

  //function to display backOfCard in a palatable way

  const backOfCardTranslator = () => {
    if (backOfCard === "kunReadings") {
      return "kun reading";
    } else if (backOfCard === "onReadings") {
      return "on reading";
    } else if (backOfCard === "nameReadings") {
      return "name reading";
    } else if (backOfCard === "meanings") {
      return "meaning";
    }
  };

  const backOfCardTranslated = backOfCardTranslator();

  return (
    <Center>
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
            <Button
              onClick={(e) => {
                dealWordCardToUserHand(e);
              }}
            >
              Draw a Flashcard
            </Button>
          </Container>
          <Modal
            opened={openedQuestion}
            onClose={() => {
              setOpenedQuestion(false);
            }}
            title="Test your Kanji"
          >
            <Text>
              What is the {backOfCardTranslated} of
              <Container>
                <Text fw={5000} size="100px" ta="center">
                  {userHand.kanji}
                </Text>
              </Container>
            </Text>
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
                    if (answerEntered === "") {
                      alert(`Please at least try to answer`);
                    } else {
                      TestFunction(answerEntered, userHand, backOfCard);
                      console.log(
                        `The result of TestFunction is ${TestFunction(
                          answerEntered,
                          userHand,
                          backOfCard
                        )}`
                      );
                      TestFunction(answerEntered, userHand, backOfCard)
                        ? setIndividualQuestionResult(true)
                        : setIndividualQuestionResult(false);
                      setOpenedResult(true);
                      setAnswerEntered("");
                    }
                  }}
                  className="testButton"
                  value="Check answer"
                >
                  Test your kanji knowledge
                </button>
              </form>
            </Container>
          </Modal>
          <Modal
            opened={openedResult}
            onClose={() => {
              setOpenedResult(false);
            }}
            title="Were you right?"
          >
            {resultFunction(userHand)}
            <Container>
              <form>
                <button
                  type="button"
                  onClick={(e) => {
                    dealWordCardToUserHand(e);
                    setOpenedResult(false);
                    // userHand ? setOpenedQuestion(true) : setOpenedScore(true);
                  }}
                  className="testButton"
                  value="Next Question"
                >
                  Next Question
                </button>
              </form>
            </Container>
          </Modal>
          <Modal
            opened={openedScore}
            onClose={() => {
              setOpenedScore(false);
            }}
            title="END OF TEST!"
          >
            You've reached the end of the test! Your score is A for effort. Test
            yourself again.
            <Container>
              <form>
                <button
                  type="button"
                  onClick={() => {
                    setOpenedScore(false);
                    navigate("/TestFormatPage");
                  }}
                  className="testButton"
                  value="The End"
                >
                  Test yourself again
                </button>
              </form>
            </Container>
          </Modal>
        </div>
      </Stack>
    </Center>
  );
};

export default TestPage;
