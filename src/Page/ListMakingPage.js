import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  Modal,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import WordTable from "../Component/WordTable";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";
import { useUserContext } from "../Context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import LoginRedirectPage from "./LoginRedirectPage";

const ListMakingPage = () => {
  let navigate = useNavigate();

  //auth0 methods
  const {
    user,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  } = useAuth0();

  //userId constant
  // const userId = "333";

  //context for userId etc
  const {
    userObject,
    setUserObject,
    userId,
    setUserId,
    // userAccessToken,
    // setUserAccessToken,
  } = useUserContext();

  //get access token
  const accessToken = getAccessTokenSilently();

  // handle wordlist selection by user
  const {
    selectedWordlistId,
    setSelectedWordlistId,
  } = useSelectedWordlistIdContext();

  //get wordlists info for names to display in dropdown box
  const [wordlists, setWordlists] = useState([]);

  //get wordlistsUseEffect
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/wordlists/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
  const {
    selectedWordlistName,
    setSelectedWordlistName,
  } = useSelectedWordlistNameContext();

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
          `${BACKEND_URL}/wordlists/${userId}/${selectedWordlistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
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
  const handleGetKanji = async (event) => {
    try {
      event.preventDefault();
      axios
        .get(`https://kanjiapi.dev/v1/kanji/${wordEntered}`)
        .then((res) => res.data)
        .then((res) => {
          console.log(`This is res of handleGetKanji ${JSON.stringify(res)}`);
          setWordToBeAdded(res);
          // console.log(`wordToBeAdded is ${JSON.stringify(wordToBeAdded)}`);　this is blank because asynchronous
        });
    } catch (err) {
      alert(`What you entered was probably not a kanji`);
    }
  };

  //handleAddWord will contain axios post for add word
  const handleAddWord = async () => {
    try {
      // const getAccessToken = await getAccessTokenSilently();
      await axios({
        method: "post",
        // url: `${BACKEND_URL}/words`,
        // headers: {
        //   Authorization: `Bearer ${getAccessToken}`,
        // },
        data: {
          wordlistId: selectedWordlistId,
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

  return isAuthenticated ? (
    <Stack
      align="flex-start"
      justify="flex-start"
      sx={() => ({
        height: 844,
      })}
      className="listMakingDiv"
    >
      <Container className="listMakingHeader" fluid>
        <Text ta="center">Modify Wordlist: {selectedWordlistName}</Text>
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
              if (wordEntered === "") {
                alert(`Please enter a kanji to be added.`);
              } else {
                setOpened(true);
                handleGetKanji(event);
              }
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
        <Container>
          <div>
            <p>
              <Text fw={5000} size="100px" ta="center">
                {wordToBeAdded.kanji}
              </Text>
              <p>meaning: {wordToBeAdded.meanings} </p>
              <p>
                kun:
                {wordToBeAdded.kun_readings}
              </p>
              <p>on: {wordToBeAdded.on_readings} </p>{" "}
              <p>
                name:
                {wordToBeAdded.name_readings}
              </p>
            </p>
          </div>
        </Container>
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
        <Button onClick={() => navigate("/TestFormatPage")}>
          Test yourself on Wordlist: {selectedWordlistName}
        </Button>
      </Container>
      <Container>
        <Center>{WordTable(words)}</Center>
      </Container>
    </Stack>
  ) : (
    <LoginRedirectPage />
  );
};

export default ListMakingPage;
