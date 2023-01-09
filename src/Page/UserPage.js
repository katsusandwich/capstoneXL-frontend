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
import "../CSS/userPage.css";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../constants";

const UserPage = () => {
  let navigate = useNavigate();

  return (
    <Center>
      <Stack
        align="flex-start"
        justify="flex-start"
        sx={() => ({
          height: 844,
        })}
        className="userPageDiv"
      >
        <Container>
          <Text className="userPageHeader">User info!</Text>
        </Container>
      </Stack>
    </Center>
  );
};

export default UserPage;
