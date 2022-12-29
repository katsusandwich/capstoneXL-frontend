import React from "react";
import { useForm } from "react-hook-form";
// import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { handleSubmit } = useForm();

  // const { logout } = useAuth0();

  const onSubmit = () => {
    // logout({ returnTo: window.location.origin });
  };

  return <span onClick={handleSubmit(onSubmit)}>Logout</span>;
};

export default Logout;
