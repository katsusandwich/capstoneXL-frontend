import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  Modal,
  TextInput,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import "../CSS/testPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";

const ListNamingPage = () => {
  let navigate = useNavigate();

  return (
    <Center>
      <Stack
        align="flex-start"
        justify="flex-start"
        sx={() => ({
          height: 844,
        })}
        className="testDiv"
      >
        <Container>List Naming Page</Container>
      </Stack>
    </Center>
  );
};

export default ListNamingPage;
