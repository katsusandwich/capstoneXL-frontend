import React from "react";
// import axios from "axios";
import { Container, Table } from "@mantine/core";
import "../CSS/listMakingPage.css";
// import { useNavigate } from "react-router";
// import { BACKEND_URL } from "../constants";
// import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
// import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";

const WordTable = (props) => {
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
  const rows = props.map((prop) => (
    <tr key={prop.id}>
      <td>{prop.kanji}</td>
      <td>
        {prop.meanings
          ? prop.meanings.map((meaning, index) => `${index + 1}.${meaning}\n`)
          : "NA"}
      </td>
      <td>
        {prop.kunReadings
          ? prop.kunReadings.map(
              (kunReading, index) => `${index + 1}.${kunReading}\n`
            )
          : "NA"}
      </td>
      <td>
        {prop.onReadings
          ? prop.onReadings.map(
              (onReading, index) => `${index + 1}.${onReading}\n`
            )
          : "NA"}
      </td>
      <td>
        {prop.nameReadings
          ? prop.nameReadings.map(
              (nameReading, index) => `${index + 1}.${nameReading}\n`
            )
          : "NA"}
      </td>
    </tr>
  ));

  return (
    <Container fluid>
      <Table striped withBorder className="listTable">
        <thead>{columns}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};

export default WordTable;
