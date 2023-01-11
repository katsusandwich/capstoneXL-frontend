import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
// import Button from "@mui/material/Button";
import { Container, Grid, Menu, Button, Text } from "@mantine/core";
import MenuItem from "@mui/material/MenuItem";
import "../CSS/Header.css";
import Logout from "./Logout";
import Login from "./Login";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const USERID = "834fc3ef-6ccc-4ba4-a54e-1a75387da94f";

const Header = () => {
  let navigate = useNavigate();

  // user
  const {
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <div>
      <Grid className="header" columns={24}>
        <Grid.Col span={19}>
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            fz="sm"
          >
            {user ? `Welcome ${user.email}` : `Sign up!`}
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <HomeIcon onClick={() => navigate("/")} />
        </Grid.Col>
        <Grid.Col span={2}>
          <Menu>
            <Menu.Target>
              <PersonOutlineOutlinedIcon id="basic-icon" />
            </Menu.Target>
            {user ? (
              <Menu.Dropdown>
                <Menu.Item onClick={() => navigate("/userpage")}>
                  User Page
                </Menu.Item>

                <Menu.Item onClick={() => navigate("/listmakingpage")}>
                  My lists
                </Menu.Item>
                <Menu.Item
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            ) : (
              <Menu.Dropdown>
                {" "}
                <Menu.Item onClick={() => loginWithRedirect()}>
                  {" "}
                  Login{" "}
                </Menu.Item>{" "}
              </Menu.Dropdown>
            )}
          </Menu>
        </Grid.Col>
        <Grid></Grid>
        <Grid xs={0.5}></Grid>
      </Grid>
      <Outlet />
    </div>
  );
};

export default Header;
