import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Stack } from "@mantine/core";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";

const TestFormatPage = () => {
  let navigate = useNavigate();

  const {
    selectedWordlistId,
    setSelectedWordlistId,
  } = useSelectedWordlistIdContext();

  return (
    <div>
      <Container>
        <Button onClick={() => navigate("/TestPage")}>
          Test yourself on Wordlist: {selectedWordlistId}
        </Button>
      </Container>

      {selectedWordlistId}
    </div>
  );
};

export default TestFormatPage;
