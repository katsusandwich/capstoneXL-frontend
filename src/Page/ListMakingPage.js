import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Container, Table, Modal, Stack } from "@mantine/core";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";

const ListMakingPage = () => {
  let navigate = useNavigate();

  //userId constant
  const userId = "333";

  // handle wordlist selection by user
  const {
    selectedWordlistId,
    setSelectedWordlistId,
  } = useSelectedWordlistIdContext();

  //get wordlists info for names to display in dropdown box
  const [wordlists, setWordlists] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/wordlists/${userId}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setWordlists(res);
        setSelectedWordlistId(res[0].id);
        setSelectedWordlistName(res[0].name);
        // console.log(wordlists); //why is this an empty array? is it because it's asynchronous? (A: yes - setting is)
      });
  }, []);

  //axios get wordlist name selected stored in state
  const [selectedWordlistName, setSelectedWordlistName] = useState();

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
        return axios.get(
          `${BACKEND_URL}/wordlists/${userId}/${selectedWordlistId}`
        );
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(
          `This is the res of the getting the individual wordlist: ${JSON.stringify(
            res
          )}`
        );
        setSelectedWordlistName(res.name);
      });
  };
  console.log(`Words are ${JSON.stringify(words)}`);

  //  useState for word to be added to be entered
  const [wordEntered, setWordEntered] = useState("");

  //useState for word to be added which is an empty set of objects
  const [wordToBeAdded, setWordToBeAdded] = useState({
    kanji: "",
    meanings: [],
    kunReadings: [],
    onReadings: [],
    nameReadings: [],
  });

  //alert box for Mantine Modal
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
          userId: userId,
          kanji: wordToBeAdded.kanji,
          meanings: wordToBeAdded.meanings,
          kunReadings: wordToBeAdded.kun_readings,
          onReadings: wordToBeAdded.on_readings,
          nameReadings: wordToBeAdded.name_readings,
          needsRevision: false,
        },
      });
      //if successful, action here
      alert(`Successfully added ${wordEntered}!`);
      setOpened(false);
      setWordEntered("");
      submitWordListId();
    } catch (error) {
      //if fail, will go to here
      alert("Please fill in a kanji.");
    }
  };

  //KANJI TABLE - VISUALS CODE
  //code for table columns
  const columns = (
    <tr>
      <th>Kanji</th>
      <th>Meanings</th>
      <th>Kun Readings</th>
      <th>On Readings</th>
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
      <td>
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
    // <AspectRatio ratio={390 / 844}>
    <Stack
      align="flex-start"
      justify="flex-start"
      sx={() => ({
        height: 844,
      })}
      className="listMakingDiv"
    >
      <Container className="listMakingHeader" fluid>
        Modify Wordlist: {selectedWordlistName}
      </Container>
      <Container fluid>
        <form>
          <select
            value={selectedWordlistId}
            onChange={(e) => {
              console.log(`e.target.value is ${e.target.value}`);
              setSelectedWordlistId(e.target.value);
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
      </Container>
      <Container fluid>
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
      </Container>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          submitWordListId();
          setWordEntered("");
        }}
        title="Do you want to add this word?"
      >
        <Container>{JSON.stringify(wordToBeAdded)}</Container>
        <div>
          <button
            type="button"
            onClick={handleAddWord}
            className="listMakingButton"
          >
            Ok, add word
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setOpened(false);
              submitWordListId();
              setWordEntered("");
            }}
            className="listMakingButton"
          >
            No, cancel
          </button>
        </div>
      </Modal>
      <Container>
        <Button onClick={() => navigate("/TestPage")}>
          Test yourself on Wordlist: {selectedWordlistName}
        </Button>
      </Container>
      <Container fluid>
        <Table striped withBorder className="listTable">
          <thead>{columns}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </Stack>
    // </AspectRatio>
  );
};

export default ListMakingPage;
