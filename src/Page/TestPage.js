import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Stack } from "@mantine/core";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";
import { useSelectedWordlistNameContext } from "../Context/SelectedWordlistNameContext";

const TestPage = () => {
  let navigate = useNavigate();

  const {
    selectedWordlistId,
    setSelectedWordlistId,
  } = useSelectedWordlistIdContext();

  const {
    selectedWordlistName,
    setSelectedWordlistName,
  } = useSelectedWordlistNameContext();

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
        <Container className="testHeader" fluid>
          Test in Progress: {selectedWordlistName}
        </Container>

        <Container>Test : {selectedWordlistName}</Container>

        {selectedWordlistName}
      </div>
    </Stack>
  );
};

export default TestPage;
