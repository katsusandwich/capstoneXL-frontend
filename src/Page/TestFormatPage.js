import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Select, Stack } from "@mantine/core";
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
  const submitBackOfCard = () => {
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

    axios
      .get(path)
      .then((res) => res.data)
      .then((res) => {
        if (JSON.stringify(res) === "[]") {
          alert(
            `There are no words in the wordlist selected that fit this testing criteria - please choose a different one.`
          );
        }
        console.log(`This is the wordlistToBeTested: ${JSON.stringify(res)}`);
        setWordlistToBeTested(res);
        return wordlistToBeTested;
      })
      .then((wordlistToBeTested) => {
        shuffleWordlistToBeTested(wordlistToBeTested);
        console.log(
          `This is the shuffled wordlistToBeTested ${JSON.stringify(
            wordlistToBeTested
          )}`
        );
        return wordlistToBeTested;
      })
      .catch((error) => {
        alert(`Unknown error!`);
        console.error(`Error in getting wordistToBeTested`);
      });
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
          <Button onClick={() => navigate("/ListMakingPage")}>
            Choose different list
          </Button>
        </Container>

        <Container className="testHeader" fluid>
          Choose Test Format: {selectedWordlistName}
        </Container>
        <Container className="testFormat">
          Which aspect of a Kanji do you want to test yourself on?
        </Container>
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
            {/* <button
              type="button"
              onClick={submitBackOfCard}
              className="testButton"
            >
              Choose Kanji Aspect
            </button> */}
          </form>
        </Container>
        <Container>
          <Button
            onClick={() => {
              submitBackOfCard();
              navigate("/TestPage");
            }}
          >
            Test yourself on Wordlist: {selectedWordlistName}
          </Button>
        </Container>
      </div>
    </Stack>
  );
};

export default TestFormatPage;
