import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import "../CSS/listMakingPage.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../constants";

const Home = () => {
  let navigate = useNavigate();

  //word
  const [words, setWords] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/words`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setWords(res);
      });
  }, []);

  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "No", width: 20, flex: 1 },
    {
      field: "col2",
      headerName: "Kanji",
      width: 20,
      flex: 1,
    },
    {
      field: "col3",
      headerName: "Means",
      width: 20,
      flex: 1,
    },
    { field: "col4", headerName: "Kun", width: 20, flex: 1 },
    { field: "col5", headerName: "On", width: 20, flex: 1 },
    {
      field: "col6",
      headerName: "Name",
      width: 20,
      flex: 1,
    },
  ];

  // {
  //   words.map((word, index) => {
  //     return (
  //       <Card
  //         key={index}
  //         sx={{ maxWidth: 180 }}
  //         style={{
  //           backgroundColor: "transparent",
  //           boxShadow: "none",
  //         }}
  //       >
  //         <Box
  //           bgcolor={
  //             sendToWishlist.fabric.id === fabric.id ? "blue" : "transparent"
  //           }
  //         >
  //           <div>
  //             <CardActions>
  //               <ul className="InstaCard">
  //                 <CardMedia
  //                   component="img"
  //                   alt="shirt"
  //                   width="250"
  //                   image={fabric.imageOne}
  //                   onClick={(event) => {
  //                     setSendToWishlist({
  //                       ...sendToWishlist,
  //                       fabric: fabric,
  //                     });
  //                   }}
  //                 />
  //                 <CardContent>
  //                   <Typography
  //                     variant="overline"
  //                     fontWeight="regular"
  //                     component="div"
  //                     lineHeight="1"
  //                     sx={{
  //                       fontSize: "11px",
  //                       mt: -2,
  //                       textAlign: "center",
  //                     }}
  //                   >
  //                     {fabric.fabricName}
  //                   </Typography>
  //                   <Typography
  //                     variant="caption"
  //                     component="div"
  //                     sx={{
  //                       fontSize: "10px",
  //                       textAlign: "center",
  //                     }}
  //                   >
  //                     Price: ${fabric.cost}
  //                   </Typography>
  //                 </CardContent>
  //               </ul>
  //             </CardActions>
  //           </div>
  //         </Box>
  //       </Card>
  //     );
  //   });
  // }

  return (
    <div className="listMakingDiv">
      <Grid2 container columnSpacing={0} rowSpacing={0}>
        <Grid2 xs={12}>
          <div className="listMakingHeader" align="middle">
            {" "}
            Modify list
          </div>
          <br />
          <br />
        </Grid2>
        <div className="listTable">
          <Grid2 xs={5}>
            <div style={{ height: 500, width: 400 }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </Grid2>
        </div>
      </Grid2>
    </div>
  );
};

export default Home;
