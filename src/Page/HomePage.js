import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "../CSS/homePage.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="homeDiv">
      <Grid2 container columnSpacing={0} rowSpacing={0}>
        <Grid2 xs={12}>
          <div className="brand" align="middle">
            Kanji Flashcards
          </div>
          <br />
          <div className="mainPageButton" align="middle">
            <Button variant="text" onClick={() => navigate("/LoginPage")}>
              Log in
            </Button>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Home;
