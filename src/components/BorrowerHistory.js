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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import AddUserModal from "./AddUserModal";
import IssueBookModal from "./IssueBookModal";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PersonIcon from "@mui/icons-material/Person";
const BorrowerHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [allData, setAllData] = useState();
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const getAllIssueData = async () => {
    const dbRef = collection(db, "issuedata");
    const res = await getDocs(dbRef);
    setAllData(
      res.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })
    );
    console.log("alldata", allData);
  };

  const handleReturnButton = async (id,data) => {
    //alert(id)
    const d = new Date();
    const dbRef = doc(db, "issuedata", id);
    
    console.log(JSON.stringify(data));
    await updateDoc(dbRef, { 
      ...data,
      returndate: d.toLocaleString()
     })
      .then(() => {
        alert("Book Returned");
        getAllIssueData();
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };
  useEffect(() => {
    getAllIssueData();
  }, []);

  useEffect(() => {
    getAllIssueData();
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
              placeholder="Search"
              name="search"
              value={search}
              onChange={handleSearch}
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
            <button
              className="bookListBtn"
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "200px",
              }}
              onClick={handleOpen}
            >
              Issue A Book
            </button>
          </Grid>
        </Grid>
      </div>
      <div className="bottomdiv">
        <div className="booklist">
          {allData
            ? allData.map((val, index) => {
                if (
                  val.data.username.toUpperCase().includes(search.toUpperCase())
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
                          <PersonIcon sx={{ fontSize: "40px" }} />
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
                            <li>Book : {val.data.bookname}</li>
                            <li>User : {val.data.username}</li>
                            <li>Issue Date : {val.data.issuedate}</li>
                            <li>Due Date : {val.data.duedate}</li>
                            <li>Return Date : {val.data.returndate}</li>
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
                          {val.data.returndate === "" ? (
                            <div
                              className="booklistIcon"
                              onClick={() => {
                                handleReturnButton(val.id , val.data);
                              }}
                            >
                              <KeyboardReturnIcon />
                              <p>Return</p>
                            </div>
                          ) : <p style={{color:"green"}}>Book Returned</p>}
                        </Grid>
                      </Grid>
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>

      <IssueBookModal state={open} onClose={handleClose} />
    </div>
  );
};

export default BorrowerHistory;
