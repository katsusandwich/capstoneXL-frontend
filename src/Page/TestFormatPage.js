import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Select, Stack } from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { shuffleWordlistToBeTested } from "../Component/TestFunction";
import { SubmitBackOfCard } from "../Component/SubmitBackofCard";
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

  const { backOfCard, setBackOfCard } = useBackOfCardContext();

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
          </form>
        </Container>
        <Container>
          <Button
            onClick={() => {
              SubmitBackOfCard(backOfCard, selectedWordlistId);
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
