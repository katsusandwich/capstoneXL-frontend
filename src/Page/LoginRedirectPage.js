import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../CSS/loginRedirectPage.css";
import { Button } from "@mui/material";

import { Container, Table, Modal, Stack, Text, Center } from "@mantine/core";

const LoginRedirectPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div class="loginRedirectDiv">
      <Container>
        <div></div>
        <div></div>
        <Container></Container>
        <Text class="brand">ログインしなさい！</Text>
        <Container>
          <Text ta="center">You need to login to proceed</Text>
        </Container>
        <Center>
          <Button variant="text" onClick={() => loginWithRedirect()}>
            Login
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default LoginRedirectPage;
