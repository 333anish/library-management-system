import React, { useEffect, useState } from "react";
import "../styles/booklist.css";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddBookModal from "./AddBookModal";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import AddUserModal from "./AddUserModal";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
const UserList = () => {
  const [open, setOpen] = React.useState(false);
  const [allData, setAllData] = useState();
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const getAllUsers = async () => {
    const dbRef = collection(db, "users");
    const res = await getDocs(dbRef);
    setAllData(
      res.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })
    );
    //console.log(allData);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [open]);
  return (
    <div className="BookListCont">
      <div className="topdiv">
        <Grid container>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              border: "0px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="search"
              value={search}
              onChange={handleSearch}
            /> */}
            <input
              className="bookListSearch"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              border: "0px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Button variant="outlined" onClick={handleOpen}>
              Add User
            </Button> */}
            <button className="bookListBtn" onClick={handleOpen}>
              Add User
            </button>
          </Grid>
        </Grid>
      </div>
      <div className="bottomdiv">
        <div className="booklist">
          {allData
            ? allData.map((val, index) => {
                if (
                  val.data.name.toUpperCase().includes(search.toUpperCase())
                ) {
                  return (
                    <div
                      key={index}
                      className="bookcard"
                      style={{ width: "80%" }}
                    >
                      <Grid
                        container
                        sx={{
                          border: "0px solid black",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: "0px",
                        }}
                      >
                        <Grid
                          item
                          xs={2}
                          lg={2}
                          sx={{
                            border: "0px solid black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          <PersonIcon sx={{fontSize:"40px"}} />
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          lg={5}
                          sx={{
                            border: "0px solid black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            padding: "0px",
                          }}
                        >
                          <ul>
                            <li>{val.data.name}</li>
                            <li>{val.data.email}</li>

                          </ul>
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          lg={5}
                          sx={{
                            border: "0px solid black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            paddingRight: "10px",
                          }}
                        >
                          <div className="booklistIcon">
                            <VisibilityIcon />
                            <p>View</p>
                          </div>
                          <div className="booklistIcon">
                            <EditIcon />
                            <p>Edit</p>
                          </div>
                          <div className="booklistIcon">
                            <DeleteIcon />
                            <p>Delete</p>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>

      <AddUserModal state={open} onClose={handleClose} />
    </div>
  );
};

export default UserList;
