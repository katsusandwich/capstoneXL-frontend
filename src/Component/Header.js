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
  const { user, getAccessTokenSilently, logout } = useAuth0();
  // const [isRegistering, setRegistering] = useState(false);

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div>
      <Grid className="header" columns={24}>
        <Grid.Col span={19}></Grid.Col>
        <Grid.Col span={2}>
          <HomeIcon onClick={() => navigate("/")} />
        </Grid.Col>
        <Grid.Col span={2}>
          <Menu>
            <Menu.Target>
              <PersonOutlineOutlinedIcon id="basic-icon" />
            </Menu.Target>
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
          </Menu>
          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-icon",
            }}
          > */}
          {/* {user && (
              <MenuItem
                onClick={() => {
                  navigate("/userProfile");
                  handleClose();
                }}
              >
                My account
              </MenuItem>
            )} */}

          {/* <MenuItem>{user ? <Logout /> : <Login />}</MenuItem> */}
          {/* </Menu> */}
        </Grid.Col>
        <Grid></Grid>
        <Grid xs={0.5}></Grid>
      </Grid>
      <Outlet />
    </div>
  );
};

export default Header;
