import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Table, Modal, Button, Group } from "@mantine/core";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
// import { Button } from "@mui/material";
import { BACKEND_URL } from "../constants";
import { SignalCellularNullSharp } from "@mui/icons-material";

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
        setSelectedWordlistId(res[0].id);
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
        console.log(`This is res of submitWordListId ${res}`);
        setWords(res);
      });
  };
  console.log(`Words are ${JSON.stringify(words)}`);

  //  useState for word to be entered
  const [wordEntered, setWordEntered] = useState("");

  //useState for word to be added which is an empty set of objects
  const [wordToBeAdded, setWordToBeAdded] = useState({
    kanji: "",
    meanings: [],
    kunReadings: [],
    onReadings: [],
    nameReadings: [],
  });

  //alert box
  const [opened, setOpened] = useState(false);

  //axios get the word from the kanji api via the blank
  const handleGetKanji = (event) => {
    event.preventDefault();
    axios
      .get(`https://kanjiapi.dev/v1/kanji/${wordEntered}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(`This is res of handleGetKanji ${JSON.stringify(res)}`);
        setWordToBeAdded(res);
        // console.log(`wordToBeAdded is ${JSON.stringify(wordToBeAdded)}`);　this is blank because asynchronous
      });
  };

  //handleAddWord will contain axios post for add word
  const handleAddWord = async () => {
    try {
      // const getAccessToken = await getAccessTokenSilently();
      await axios({
        method: "post",
        url: `${BACKEND_URL}/words`,
        // headers: {
        //   Authorization: `Bearer ${getAccessToken}`,
        // },
        data: {
          wordlistId: selectedWordlistId,
          // userId: user.sub,
          userId: 333,
          kanji: wordToBeAdded.kanji,
          meanings: wordToBeAdded.meanings,
          kunReadings:
            wordToBeAdded.kun_readings === "[]"
              ? JSON.stringify(wordToBeAdded.kun_readings)
              : wordToBeAdded.kun_readings,
          onReadings:
            wordToBeAdded.on_readings === "[]"
              ? JSON.stringify(wordToBeAdded.on_readings)
              : wordToBeAdded.on_readings,
          nameReadings:
            wordToBeAdded.name_readings === "[]"
              ? JSON.stringify(wordToBeAdded.name_readings)
              : wordToBeAdded.name_readings,
          needsRevision: false,
        },
      });
      //if successful, action here
      alert("Successfully added word!");
    } catch (error) {
      //if fail, will go to here
      alert("Please fill in a kanji.");
    }
  };

  //VISUALS
  //code for table columns
  const columns = (
    <tr>
      <th>Kanji</th>
      <th>Meanings</th>
      <th>Kun Readings</th>
      <th className="column">On Readings</th>
      <th>Name Readings</th>
    </tr>
  );

  //code for table rows
  const rows = words.map((word) => (
    <tr key={word.id}>
      <td>{word.kanji}</td>
      <td>
        {word.meanings
          ? word.meanings.map((meaning, index) => `${index + 1}.${meaning}\n`)
          : "NA"}
      </td>
      <td>
        {word.kunReadings
          ? word.kunReadings.map(
              (kunReading, index) => `${index + 1}.${kunReading}\n`
            )
          : "NA"}
      </td>
      <td className="column">
        {word.onReadings
          ? word.onReadings.map(
              (onReading, index) => `${index + 1}.${onReading}\n`
            )
          : "NA"}
      </td>
      <td>
        {word.nameReadings
          ? word.nameReadings.map(
              (nameReading, index) => `${index + 1}.${nameReading}\n`
            )
          : "NA"}
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
          <div>
            <form>
              <input
                type="text"
                value={wordEntered}
                onChange={(e) => {
                  console.log(`formbox is ${e.target.value}`);
                  setWordEntered(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={(event) => {
                  setOpened(true);
                  handleGetKanji(event);
                }}
                className="listMakingButton"
                value="Add word"
              >
                Add word
              </button>
            </form>
            <>
              <Modal
                opened={opened}
                onClose={() => {
                  setOpened(false);
                  submitWordListId();
                  setWordEntered("");
                }}
                title="Do you want to add this word?"
              >
                {JSON.stringify(wordToBeAdded)}
                <div>
                  <button
                    type="button"
                    onClick={handleAddWord}
                    className="listMakingButton"
                  >
                    Ok, add word
                  </button>
                </div>
              </Modal>
            </>
          </div>
          <div className="listTable" align="centre">
            <Grid2 xs={5}>
              <Table striped withBorder>
                <thead>{columns}</thead>
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
