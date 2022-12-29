import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../CSS/Header.css";
import Logout from "./Logout";
import Login from "./Login";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const USERID = "834fc3ef-6ccc-4ba4-a54e-1a75387da94f";

const Header = () => {
  let navigate = useNavigate();

  // user
  // const { user, getAccessTokenSilently } = useAuth0();
  // const [isRegistering, setRegistering] = useState(false);
  // const { setAdmin } = useAdminContext();
  // const { userDetails, setUserDetails } = useUserContext();

  // useEffect(() => {
  //   const getShoppingCart = async () => {
  //     // to be activated once the userAutho is ready (Zi Hao side)
  //     // samuel, this needs to be activated when user add item into cart also. maybe use useContext for this one. when user log in, axios.get shopping cart --> then pass the .length here.
  //     if (user) {
  //       //admin role
  //       if (user.sub === process.env.REACT_APP_ADMIN_ID_ONE) {
  //         setAdmin(true);
  //       }
  //       if (user.sub !== process.env.REACT_APP_ADMIN_ID_ONE) {
  //         setAdmin(false);
  //       }
  //       try {
  //         const accessToken = await getAccessTokenSilently({
  //           audience: "https://group1-project3/api",
  //           scope: "read:current_user",
  //         });

  //         await axios
  //           .(`${BACKEND_URL}/users/${user.sub}/wishlists/`, {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           })
  //           .then((res) => res.data)
  //           .then((res) => {
  //             setShoppingCart(res);
  //             setCartLength(res.length);
  //           });

  //         await axios
  //           .get(`${BACKEND_URL}/users/${user.sub}`, {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           })
  //           .then((res) => res.data)
  //           .then((res) => {
  //             if (!res) {
  //               try {
  //                 axios
  //                   .post(
  //                     `${BACKEND_URL}/users`,
  //                     {
  //                       id: user.sub,
  //                       email: user.email,
  //                     },
  //                     {
  //                       headers: {
  //                         Authorization: `Bearer ${accessToken}`,
  //                       },
  //                     }
  //                   )
  //                   .then((response) => {
  //                     console.log(response);
  //                     setRegistering(true);
  //                   });
  //               } catch (e) {
  //                 console.log(e);
  //               }
  //             } else {
  //               setUserDetails(res);
  //               setRegistering(false);
  //             }
  //           });
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   };
  //   getShoppingCart();
  // }, [user, isRegistering]);

  // useEffect(() => {
  //   console.log("test");
  //   shoppingCart && setCartLength(Object.keys(shoppingCart).length);
  // }, [shoppingCart]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Grid2 container columnSpacing={0} rowSpacing={0} className="header">
        <Grid2 xs={0.3}></Grid2>
        <Grid2 xs={3.2}>{/* <NavBar user={user} /> */}</Grid2>
        <Grid2 xs={5} className="headerLogo" onClick={() => navigate("/")}>
          {/* <div
            align="middle"
            className="headerLogo"
            onClick={() => navigate("/")}
          >
            Sew Sew Tailor
          </div> */}
        </Grid2>
        <Grid2 xs={1}>
          {/* <FavoriteBorderOutlinedIcon
          
          /> */}
        </Grid2>
        <Grid2 xs={1} className="userDiv">
          <PersonOutlineOutlinedIcon
            id="basic-icon"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-icon",
            }}
          >
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

            {/* {user && (
              <MenuItem
                onClick={() => {
                  navigate("/sizeProfile");
                  handleClose();
                }}
              >
                Size Profile
              </MenuItem>
            )} */}
            {/* {user && (
              <MenuItem
                onClick={() => {
                  navigate("/OrderSummary");
                  handleClose();
                }}
              >
                Order History
              </MenuItem>
            )} */}
            {/* <MenuItem>{user ? <Logout /> : <Login />}</MenuItem> */}
          </Menu>
        </Grid2>
        <Grid2 xs={0.5}></Grid2>
      </Grid2>
      <Outlet />
    </div>
  );
};

export default Header;
