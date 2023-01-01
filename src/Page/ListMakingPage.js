import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../constants";

const ListMakingPage = () => {
  let navigate = useNavigate();

  //axios get wordlistnames
  const [wordlistNames, setWordlistNames] = useState([]);
  const [selectedWordlistName, setSelectedWordlistName] = useState(
    wordlistNames[0]
  );
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/wordlists/333`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setWordlistNames(res);
      });
  }, []);

  console.log(wordlistNames);

  const submitWordListName = () => {
    console.log(selectedWordlistName);
  };

  //axios get words
  const [words, setWords] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/words/1`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setWords(res);
      });
  }, []);

  console.log(words);

  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    {
      id: 2,
      col1: "DataGridPro",
      col2: "is Awesome",
    },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "No",
      width: 20,
      flex: 1,
    },
    {
      field: "col2",
      headerName: "Kanji",
      width: 20,
      flex: 1,
    },
    {
      field: "col3",
      headerName: "Means",
      width: 20,
      flex: 1,
    },
    {
      field: "col4",
      headerName: "Kun",
      width: 20,
      flex: 1,
    },
    {
      field: "col5",
      headerName: "On",
      width: 20,
      flex: 1,
    },
    {
      field: "col6",
      headerName: "Name",
      width: 20,
      flex: 1,
    },
  ];

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
                value={selectedWordlistName}
                onChange={(e) => setSelectedWordlistName(e.target.value)}
              >
                {wordlistNames.map((wordlistName, index) => (
                  <option value={wordlistName} key={index}>
                    {wordlistName.name}
                    {console.log(selectedWordlistName)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={submitWordListName}
                className="listMakingButton"
              >
                Choose Wordlist
              </button>
            </form>
          </div>
        </Grid2>
        <Grid2 xs={5}>
          <div>
            <div>
              <br /> <br />
              <div className="listTable" align="centre">
                <Grid2 xs={5}>
                  <div style={{ height: 500, width: 400 }}>
                    <DataGrid rows={rows} columns={columns} />
                  </div>
                </Grid2>
              </div>
            </div>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ListMakingPage;
