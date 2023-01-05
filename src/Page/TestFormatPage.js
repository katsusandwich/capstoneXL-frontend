import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Select, Stack } from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
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
    // axios
    //   .get(`${BACKEND_URL}/words/${selectedWordlistId}`)
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log(`This is res of submitWordListId ${res}`);
    //     setWords(res);
    //     return axios.get(
    //       `${BACKEND_URL}/wordlists/${userId}/${selectedWordlistId}`
    //     );
    //   })
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log(
    //       `This is the res of the getting the individual wordlist: ${JSON.stringify(
    //         res
    //       )}`
    //     );
    //     setSelectedWordlistName(res.name);
    //   });
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
            <button
              type="button"
              onClick={submitBackOfCard}
              className="choosing aspect of kanji"
            >
              Choose Kanji Aspect
            </button>
          </form>
        </Container>
        <Container>
          <Button onClick={() => navigate("/TestPage")}>
            Test yourself on Wordlist: {selectedWordlistName}
          </Button>
        </Container>

        {selectedWordlistName}
      </div>
    </Stack>
  );
};

export default TestFormatPage;
