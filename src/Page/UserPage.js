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
import { useAuth0 } from "@auth0/auth0-react";

const UserPage = () => {
  let navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="userPageHeader">Loading ...</div>;
  }

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
        <Container className="userPageHeader">
          <Text className="userPageHeader">User info!</Text>
        </Container>
        <Container className="userPageHeader">
          isAuthenticated && (
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          )
        </Container>
      </Stack>
    </Center>
  );
};

export default UserPage;
