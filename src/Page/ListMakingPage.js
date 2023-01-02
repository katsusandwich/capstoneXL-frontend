import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Table } from "@mantine/core";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../constants";

const ListMakingPage = () => {
  let navigate = useNavigate();

  //axios get wordlistnames
  const [wordlistNames, setWordlistNames] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/wordlists/333`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setWordlistNames(res);
        // console.log(wordlistNames); //why is this an empty array? is it because it's asynchronous? (A: yes - setting is)
      });
  }, []);

  // handle wordlist selection by user
  const [selectedWordlistId, setSelectedWordlistId] = useState();

  //axios get words from wordlist selected by User
  const [words, setWords] = useState([]);
  const submitWordListId = () => {
    console.log(`selectedWordlistId is ${selectedWordlistId}`);
    axios
      .get(`${BACKEND_URL}/words/${selectedWordlistId}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setWords(res);
      });
  };
  console.log(`Words are ${JSON.stringify(words)}`);

  //no longer need getting of words to be a useeffect
  // useEffect(() => {
  //   axios
  //     .get(`${BACKEND_URL}/words/1`)
  //     .then((res) => res.data)
  //     .then((res) => {
  //       console.log(res);
  //       setWords(res);
  //     });
  // }, []);

  //code for table rows
  const rows = words.map((word) => (
    <tr key={word.id}>
      <td>{word.kanji}</td>
      <td>
        {word.meanings.map((meaning, index) =>
          meaning === "" ? "NA" : `${index + 1}.${meaning}\n`
        )}
      </td>
      <td>
        {word.kunReadings.map((kunReading, index) =>
          kunReading === "" ? "NA" : `${index + 1}.${kunReading}\n`
        )}
      </td>
      <td>
        {word.onReadings.map((onReading, index) =>
          onReading === "" ? "NA" : `${index + 1}.${onReading}\n`
        )}
      </td>
      <td>
        {word.nameReadings.map((nameReading, index) =>
          nameReading === "" ? "NA" : `${index + 1}.${nameReading}\n`
        )}
      </td>
    </tr>
  ));

  return (
    <div className="listMakingDiv">
      <Grid2 container columnSpacing={0} rowSpacing={0}>
        <Grid2 xs={12}>
          <div className="listMakingHeader" align="middle">
            {" "}
            Modify Wordlist
          </div>
          <br />
          <br />
        </Grid2>
        <Grid2>
          <br />
          <br /> <br />
          <div>
            <form>
              <br /> <br />
              Select Wordlist
              <select
                value={selectedWordlistId}
                onChange={(e) => {
                  console.log(`e.target.value is ${e.target.value}`);
                  setSelectedWordlistId(e.target.value);
                  // console.log(selectedWordlistId); // this prints empty because of setState again. you can't immediately check. if u want to check, use a useEffect
                }}
              >
                {wordlistNames.map((wordlistName, index) => (
                  <option value={wordlistName.id} key={index}>
                    {wordlistName.name}
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
          </div>
        </Grid2>
        <Grid2 xs={5}>
          <div className="listTable" align="centre">
            <Grid2 xs={3}>
              <Table striped withBorder horizontalSpacing="sm">
                <thead>
                  <tr>
                    <th>Kanji</th>
                    <th>Meanings</th>
                    <th>Kun Readings</th>
                    <th>On Readings</th>
                    <th>Name Readings</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Grid2>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ListMakingPage;
