import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import { useDispatch } from "react-redux";
import { setLoaderVisible } from "../redux/slices/loaderSlice";
import { Alert } from "@mui/material";
import "../styles/modal.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

export default function EditUserModel(props) {
  console.log("props",props.data.passowrd);
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [data, setData] = React.useState({
    name: "",
    mobile: "",
    email: "",
    passowrd: "",
    role: "",
    issueHistory: [
      {
        bookId: "",
        bookName: "",
        issueDate: "",
        returnDate: "",
        duedate: "",
      },
    ],
    favourites: [
      {
        bookid: "",
        bookName: "",
      },
    ],
    viewHistory: [
      {
        bookid: "",
        bookName: "",
      },
    ],
  });
  

  const handleChangeSelect = (event) => {
    setRole(event.target.value);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

//   const addUserDatatoDB = async () => {
//     const dbRef = collection(db, "users");
//     await addDoc(dbRef, data)
//       .then(() => {
//         dispatch(setLoaderVisible(false));
//         setSuccess(true);
//         setFail(false);
//         setData({
//           name: "",
//           mobile: "",
//           email: "",
//           passowrd: "",
//           role: "",
//           issueHistory: {
//             bookId: "",
//             bookName: "",
//             issueDate: "",
//             returnDate: "",
//           },
//           favourites: {
//             bookid: "",
//             bookName: "",
//           },
//           viewHistory: {
//             bookid: "",
//             bookName: "",
//           },
//         });
//       })
//       .catch((e) => {
//         setFail(true);
//         setSuccess(false);
//       });
//   };

  const updateUserData = async ()=>{
    const dbRef =doc(db,"users",props.id);
    console.log(data);
    await setDoc(dbRef,data).then(() => {
        alert('Document successfully written!');
        props.onClose()
      })
      .catch((error) => {
        alert('Error writing document:', error);
      });
  }

  const handleSubmit = () => {
    //data.role = role;
    dispatch(setLoaderVisible(true));
    updateUserData();
  };
  React.useEffect(() => {
    setData({
      name: props.data.name,
      mobile: props.data.mobile,
      email: props.data.email,
      passowrd: "a",
      role: props.data.role,
    });
    //console.log("password",data.passowrd );
  }, [props]);
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
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              className="modalcont"
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit User Details

              </Typography>
              <p>ID : {props.id}</p>
              <input
                className="modalInput"
                type="text"
                placeholder="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <input
                className="modalInput"
                type="text"
                placeholder="Mobile"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
              />
              <input
                className="modalInput"
                type="text"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              {/* <FormControl sx={{ width: "70%" }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                </Select>
              </FormControl> */}
              <br />
              <button className="modalSubmit" onClick={handleSubmit}>
                Add User
              </button>
              {success ? (
                <Alert severity="success">User Added Successfully</Alert>
              ) : null}
              {fail ? <Alert severity="error">An Error Occoured</Alert> : null}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
