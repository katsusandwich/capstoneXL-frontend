import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Select, Stack } from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";
import { useBackOfCardContext } from "../Context/BackOfCardContext";

const TestFormatPage = () => {
  let navigate = useNavigate();

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

  //back of card options - think this will need to be able to mirror the structure of the kanji word in the database

  // const backOfCardOptions = ["Meanings"];

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
          {/* <form>
            <select
              value={backOfCard}
              onChange={(e) => {
                console.log(`e.target.value is ${e.target.value}`);
                setBackOfCard(e.target.value);
                // console.log(selectedWordlistId); // this prints empty because of setState again. you can't immediately check. if u want to check, use a useEffect
              }}
            >
              {wordlists.map((wordlist, index) => (
                <option value={wordlist.id} key={index}>
                  {wordlist.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={submitWordListId}
              className="listMakingButton"
            >
              Choose Wordlist
            </button>
          </form>
          {/* <Select 
          label="Aspect of a Kanji" placeholder="Pick one" data=
          {[
            { value: "meanings", label: "Meaning" },
            { value: "kunReadings", label: "Kun reading" },
            { value: "onReadings", label: "On Reading" },
            { value: "nameReadings", label: "Name Reading" },
          ]}
          value={data.value}
          onChange=
          {(e) => {
            console.log(`e.target.value is ${e.target.value}`);
            setBackOfCard(e.target.value);
          }}
        /> */}
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
