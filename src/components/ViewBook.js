import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";

import "../styles/modal.css"

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

export default function ViewBook(props) {
    //console.log("props",props.data.category);

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





React.useEffect(()=>{
    setData({
        name: props.data.name,
        category:props.data.category,
        isbn: props.data.isbn,
        quantity: props.data.quantity,
        issueHistory: [{
          id: "",
          name: "",
        }],
      });

},[props])
  return (
    <div>
      <Modal
      
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.state}
        onClose={()=>{
            setData({
          name: "",
          category:"",
          isbn: "",
          quantity: "",
          issueHistory: [{
            id: "",
            name: "",
          }],
        });
            props.onClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.state}>
          <Box sx={style}  className="modal">

            <Typography id="transition-modal-description" sx={{ mt: 2 }} className="modalcont">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Books Deatils
            </Typography>
            
              
                    <>
                    <input
              className="modalInput"
                type="text"
                placeholder="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                readOnly
              />
              <input
              className="modalInput"
                type="text"
                placeholder="ISBN"
                name="isbn"
                value={data.isbn}
                onChange={handleChange}
                readOnly
              />
              <input
              className="modalInput"
                type="text"
                placeholder="Category"
                name="category"
                value={data.category}
                onChange={handleChange}
                readOnly
              />
              <input
              className="modalInput"
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={data.quantity}
                onChange={handleChange}

                readOnly
              />
                    </>

            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
