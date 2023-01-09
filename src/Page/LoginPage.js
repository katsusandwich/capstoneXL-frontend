import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Container,
  Table,
  Modal,
  Stack,
  Text,
  Center,
} from "@mantine/core";

const LoginPage = () => {
  const {
    loginWithRedirect,
    // getAccessTokenSilently,
    // isAuthenticated,
  } = useAuth0();

  return (
    <div>
      <div onClick={() => loginWithRedirect()}>Login</div>
      <Container>
        {/* {!isAuthenticated ? ( */}
        <Button
          component="button"
          variant="overline"
          color="inherit"
          onClick={() => loginWithRedirect()}
          fontSize="inherit"
        >
          Login/Signup
        </Button>
        {/* ) : (
          <Container>users deets</Container>
        )} */}
      </Container>
    </div>
  );
};

export default LoginPage;
