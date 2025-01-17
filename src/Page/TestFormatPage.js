import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  Modal,
  Select,
  Stack,
  Center,
  Text,
} from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { shuffleWordlistToBeTested } from "../Component/TestFunction";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";
import { useBackOfCardContext } from "../Context/BackOfCardContext";
import { useWordlistToBeTestedContext } from "../Context/WordlistToBeTestedContext";

const TestFormatPage = () => {
  let navigate = useNavigate();

  //set default choice of kanji aspect by the user

  useEffect(() => {
    setBackOfCard("kunReadings");
    console.log(`backOfCarduseEffect is ${backOfCard}`);
  }, []);

  //alert box for Mantine Modal
  const [opened, setOpened] = useState(false);

  //is the testing criteria empty?

  const [testNoWords, setTestNoWords] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate) {
      if (testNoWords) {
        navigate("/TestFormatPage");
      } else {
        navigate("/TestPage");
      }
      setShouldNavigate(false);
    }
  }, [shouldNavigate, testNoWords]);

  //bring in contexts
  const {
    selectedWordlistId,
    setSelectedWordlistId,
  } = useSelectedWordlistIdContext();

  const {
    selectedWordlistName,
    setSelectedWordlistName,
  } = useSelectedWordlistNameContext();

  const {
    wordlistToBeTested,
    setWordlistToBeTested,
  } = useWordlistToBeTestedContext();

  const { backOfCard, setBackOfCard } = useBackOfCardContext();

  //button to choose testFormat
  //async await version of code

  const submitBackOfCard = async () => {
    try {
      console.log(`pressbutton backOfCard is ${backOfCard}`);

      let path = "";
      switch (backOfCard) {
        case "meanings":
          path = `${BACKEND_URL}/words/${selectedWordlistId}`;
          break;
        case "kunReadings":
          path = `${BACKEND_URL}/words/${selectedWordlistId}/kunReadings`;
          break;
        case "onReadings":
          path = `${BACKEND_URL}/words/${selectedWordlistId}/onReadings`;
          break;
        case "nameReadings":
          path = `${BACKEND_URL}/words/${selectedWordlistId}/nameReadings`;
          break;
        default:
          // throw error or default value
          break;
      }

      const res = await axios.get(path).then((res) => res.data);
      if (JSON.stringify(res) === "[]") {
        setTestNoWords(true);
        setOpened(true);
      }
      console.log(`This is the wordlistToBeTested: ${JSON.stringify(res)}`);
      setWordlistToBeTested(res);
      const wordlistToBeTested = await shuffleWordlistToBeTested(res);
      console.log(
        `This is the shuffled wordlistToBeTested ${JSON.stringify(
          wordlistToBeTested
        )}`
      );
      setShouldNavigate(true);
    } catch (error) {
      alert(`Unknown error!`);
      console.error(`Error in getting wordistToBeTested`);
    }
  };

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
            <Button onClick={() => navigate("/ListMakingPage")}>
              Choose different list
            </Button>
          </Container>

          <Container className="testHeader" fluid>
            <Text>{selectedWordlistName}</Text>
          </Container>
          <Container className="testFormat">
            Choose Kanji aspect to test
          </Container>
          <Modal
            opened={opened}
            onClose={() => {
              setOpened(false);
              setTestNoWords(false);
            }}
            title="There are no words in the wordlist selected that fit this testing criteria - please choose a different one."
          ></Modal>
          <Container>
            <form>
              <select
                name="backOfCard"
                value={backOfCard}
                onChange={(e) => {
                  console.log(`e.target.value is ${e.target.value}`);
                  setBackOfCard(e.target.value);
                }}
              >
                <option value="kunReadings">Kun Reading</option>
                <option value="onReadings">On Reading</option>
                <option value="nameReadings">Name Reading</option>
                <option value="meanings">Meaning</option>
              </select>
            </form>
          </Container>
          <Container>
            <Button
              onClick={() => {
                submitBackOfCard();
              }}
            >
              Test yourself on Wordlist: {selectedWordlistName}
            </Button>
          </Container>
        </div>
      </Stack>
    </Center>
  );
};

export default TestFormatPage;
