import React, { useEffect, useState } from "react";
import "../styles/booklist.css";
import {
  
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  
} from "@mui/material";

import AddBookModal from "./AddBookModal";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase/firebase";

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBookModal from "./EditBookModal";
import ViewBook from "./ViewBook";

const BooksList = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editId,setEditId] = useState("");
  const [editData,setEditData]= useState({
    name: "",
    category:"",
    isbn: "",
    quantity: "",
    issueHistory: [{
      id: "",
      name: "",
    }],
  });

  const [openView, setOpenView] = React.useState(false);
  const [viewId,setviewId] = useState("");
  const [viewData,setViewData]= useState({
    name: "",
    category:"",
    isbn: "",
    quantity: "",
    issueHistory: [{
      id: "",
      name: "",
    }],
  });

  const [allData, setAllData] = useState();
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenView = () => setOpenView(true);
  const handleCloseVIew = () => setOpenView(false);

  const handleEditButton=(id,data1)=>{
    //console.log("data1",data1.name);
    setEditId(id)
    setEditData({
      name:data1.name,
      category:data1.category,
      isbn:data1.isbn,
      quantity:data1.quantity
    })
    handleOpenEdit()

    //console.log("editData",editId,editData.name);
  }

  const handleViewButton=(id,data1)=>{
    //console.log("data1",data1.name);
    setviewId(id)
    setViewData({
      name:data1.name,
      category:data1.category,
      isbn:data1.isbn,
      quantity:data1.quantity
    })
    handleOpenView()

    //console.log("editData",editId,editData.name);
  }
 
  const [mitem, setMenuItem] = useState([]);
  let menuItem = [];
  const [category, setCategory] = React.useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const getAllBooks = async () => {
    const dbRef = collection(db, "books");
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
    getAllBooks();
  }, []);
  useEffect(() => {
    getAllBooks();
  }, [open]);
  useEffect(() => {
    getAllBooks();
  }, [openEdit]);
  useEffect(() => {
    if (allData) {
      allData.map((val) => {
        menuItem.push(val.data.category);
      });
    }

    // setMenuItem(
    //   menuItem.filter((item, index) => {
    //     return menuItem.indexOf(item) === index;
    //   })
    // );

    menuItem = menuItem.filter((item, index) => {
      return menuItem.indexOf(item) === index;
    });
    setMenuItem(menuItem);
    //console.log(menuItem);
  }, [allData]);

  useEffect(() => {
    //console.log(menuItem);
    //setMenuItem(menuItem)
  }, [menuItem]);
  useEffect(() => {
    console.log(category);
  }, [category]);
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
            <input className="bookListSearch" placeholder="Search" name="search" value={search} onChange={handleSearch} />
          </Grid>
          <Grid item xs={6} lg={6} sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"center"}}>
            {/* <Button variant="outlined" onClick={handleOpen}>
              Add Books
            </Button> */}
            <button className="bookListBtn" onClick={handleOpen}>
            Add Books
            </button>
          </Grid>
          <Grid item xs={12} lg={6} sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"flex-start" , padding:"10px"}}>
            <FormControl sx={{width:"250px"}}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
                onChange={handleCategoryChange}
              >
                <MenuItem value={""}>All</MenuItem>
                {mitem.length > 0 ? (
                  mitem.map((val, index) => {
                    return (
                      <MenuItem key={index} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })
                ) : (
                  <p>No data</p>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div className="bottomdiv">
        <div className="booklist">
          {allData
            ? allData.map((val, index) => {
                if (
                  val.data.name.toUpperCase().includes(search.toUpperCase()) &&
                  val.data.category
                    .toUpperCase()
                    .includes(category.toUpperCase())
                ) {
                  return (
                    <div key={index} className="bookcard" style={{width:"80%"}}>
                    <Grid container sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"flex-start" , padding:"0px"}}>
                      <Grid item xs={2} lg={2} sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"center" , padding:"10px"}}>
                        <img  alt="" src="./book.png" style={{height:"80px"}} />
                      </Grid>
                      <Grid item xs={5} lg={5} sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"flex-start" , padding:"0px"}}>
                       <ul>
                        <li>{val.data.name}</li>
                        <li>{val.data.category}</li>
                        <li>{val.data.isbn}</li>
                        <li>{val.data.quantity}</li>
                       </ul>
                      </Grid>
                      <Grid item xs={5} lg={5} sx={{border:"0px solid black" , display:"flex" , alignItems:"center" , justifyContent:"space-around" , paddingRight:"10px"}}>
                       
                       <div className="booklistIcon" onClick={()=>{
                        handleViewButton(val.id,val.data)
                       }}>
                       <VisibilityIcon />
                       <p>View</p>
                       </div>
                       <div className="booklistIcon" onClick={()=>{
                        handleEditButton(val.id,val.data)
                       }}>
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
                return(
                  <h3>No Result</h3>
                )
              })
            : <h3>No Result</h3>}
        </div>
      </div>
      <AddBookModal state={open} onClose={handleClose} />
      <EditBookModal state={openEdit} onClose={handleCloseEdit} id={editId} data={editData} />
      <ViewBook state={openView} onClose={handleCloseVIew} id={viewId} data={viewData} />
    </div>
  );
};

export default BooksList;
