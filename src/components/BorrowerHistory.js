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
import IssueBookModal from "./IssueBookModal";
const BorrowerHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [allData, setAllData] = useState();
  const [search , setSearch] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }
  const getAllUsers = async () => {
    const dbRef = collection(db, "users");
    const res = await getDocs(dbRef);
    setAllData(
      res.docs.map((doc) => {
        return doc.data();
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
          <Grid item xs={12} lg={12} sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"center"}}>
            {/* <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="search"
              value={search}
              onChange={handleSearch}
            /> */}
            <input className="bookListSearch" placeholder="Search" name="search"
              value={search}
              onChange={handleSearch} />
          </Grid>
          <Grid item xs={12} lg={12} sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"center"}}>
            <button className="bookListBtn" style={{paddingLeft:"10px" , paddingRight:"10px" , width:"200px"}} onClick={handleOpen}>
              Issue A Book
            </button>
          </Grid>
          
        </Grid>
      </div>
      <div className="bottomdiv">
        <div className="booklist">
          {allData
            ? allData.map((val, index) => {
                if(val.name.toUpperCase().includes(search.toUpperCase())){
                    return (
                  <div key={index}>
                    <p>Name : {val.name}</p>
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
