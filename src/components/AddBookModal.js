import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import { useDispatch } from "react-redux";
import { setLoaderVisible } from "../redux/slices/loaderSlice";
import { Alert } from "@mui/material";

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

export default function AddBookModal(props) {
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    category: "",
    isbn: "",
    quantity: 0,
    issueHistory: [{
      id: "",
      name: "",
    }],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const addBookDatatoDB = async () => {
    const dbRef = collection(db, "books");
    await addDoc(dbRef, data)
      .then(() => {
        dispatch(setLoaderVisible(false));
        setSuccess(true);
        setFail(false);
        setData({
          name: "",
          category: "",
          isbn: "",
          quantity: 0,
          issueHistory: [{
            id: "",
            name: "",
          }],
        });
      })
      .catch((e) => {
        setFail(true);
        setSuccess(false);
      });
  };

  const handleSubmit = () => {
    dispatch(setLoaderVisible(true));
    addBookDatatoDB();
  };

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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Book Details
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                value={data.isbn}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={data.category}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={data.quantity}
                onChange={handleChange}
              />
              <br />
              <Button varient="outlined" onClick={handleSubmit}>
                Add Book
              </Button>
              {success ? (
                <Alert severity="success">Book Added Successfully</Alert>
              ) : null}
              {fail ? <Alert severity="error">An Error Occoured</Alert> : null}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
