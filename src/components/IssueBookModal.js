import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../styles/modal.css"
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import { useDispatch } from "react-redux";
import { setLoaderVisible } from "../redux/slices/loaderSlice";
import { Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function IssueBookModal(props) {
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [data, setData] = React.useState({
    bookId: "",
    bookName: "",
    issueDate: "",
    dueDate: "",
  });

  const [userEmail , setUSerEmail] = React.useState({
    email:"",
    id:""
  })
  const [allBookData, setAllBookData] = React.useState([]);
  const [alluserData, setAllUserData] = React.useState([]);
  let udata = [];
  //console.log(udata , Array.isArray(udata) , typeof(udata));


  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const addUserDatatoDB = async () => {
    const dbRef = collection(db, "users");
    await addDoc(dbRef, data)
      .then(() => {
        dispatch(setLoaderVisible(false));
        setSuccess(true);
        setFail(false);
        setData({
          bookId: "",
          bookName: "",
          issueDate: "",
          dueDate: "",
        });
      })
      .catch((e) => {
        setFail(true);
        setSuccess(false);
      });
  };

  const getUserList = async () => {
    const dbRef = collection(db, "users");
    const res = await getDocs(dbRef);
    setAllUserData(
      res.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })
    );
  };
  const getBookList = async () => {
    const dbRef = collection(db, "books");
    const res = await getDocs(dbRef);
    setAllBookData(
      res.docs.map((doc) => {
        return doc.data();
      })
    );
  };
  const handleSubmit = () => {
    dispatch(setLoaderVisible(true));
    addUserDatatoDB();
  };

  React.useEffect(() => {
    getUserList();
    getBookList();
  }, []);
  React.useEffect(() => {
    console.log("allUserData", alluserData);
    alluserData.map((val) => {
      udata.push({
        label: val.data.email,
        id: val.id,
      });
    });

    console.log("udata", udata);
  }, [alluserData]);
  React.useEffect(() => {
    //console.log("bookdata",typeof(allBookData));
    //console.log(alluserData);
    //console.log("userData",typeof(alluserData));
    //console.log("userData", typeof udata);
  }, [allBookData, alluserData]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.state}
        onClose={props.onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.state}>
          <Box sx={style} className="modal">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Issue Book
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} className="modalcont">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Issue Book
            </Typography>

              {alluserData.length > 0 ? (
                <FormControl sx={{width:"70%"}}>
                  <InputLabel id="demo-simple-select-label">User</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userEmail}
                    label="User"
                    onChange={(e)=>{
                        
                        setUSerEmail({
                            email:e.target.value.email,
                            id:e.target.value.id
                        })

                        console.log(userEmail);
                    }}
                  >
                  {
                    alluserData.map((val,index)=>{
                        return(
                            <MenuItem value={{email:val.data.email,id:val.id}}>{val.data.email}</MenuItem>
                        )
                    })
                  }
                    

                  </Select>
                </FormControl>
              ) : null}
              <br />
              <button className="modalSubmit" onClick={handleSubmit}>
                Issue Book
              </button>
              {success ? (
                <Alert severity="success">Book Issued Successfully</Alert>
              ) : null}
              {fail ? <Alert severity="error">An Error Occoured</Alert> : null}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
