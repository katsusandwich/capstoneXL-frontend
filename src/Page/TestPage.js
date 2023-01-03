import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Modal, Stack } from "@mantine/core";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";
import { useSelectedWordlistIdContext } from "../Context/SelectedWordlistIdContext";

const TestPage = () => {
  let navigate = useNavigate();

  const {
    selectedWordlistId,
    setSelectedWordlistId,
  } = useSelectedWordlistIdContext();

  return <div>{selectedWordlistId}</div>;
};

export default TestPage;
