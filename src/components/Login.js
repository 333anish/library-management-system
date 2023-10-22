import React, { useEffect, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import "../styles/login.css";
import { useDispatch } from "react-redux";
import { db } from "../services/firebase/firebase";
import { auth } from "../services/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setLoaderVisible } from "../redux/slices/loaderSlice";
import styled from "@emotion/styled";

const Login = () => {
  const alltheData = [];
  const userCollectionRef = collection(db, "users");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showALert, setShowALert] = useState(false);
  const [users, setUsers] = useState([]);
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({
      ...cred,
      [name]: value,
    });
  };

  //   const getUser = async (email) => {
  //     const snapshot = await userCollectionRef.where("email", "==", email).get();
  //     if (snapshot.empty) {
  //       console.log("No matching User.");
  //       return;
  //     }

  //     snapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   };
  async function handleSubmit(event) {
    event.preventDefault(); // Correct way to prevent form submission
    // Rest of your code
    dispatch(setLoaderVisible(true));
    const dd = getFirestore();
    const collRef = collection(db, "users");

    try {
      await signInWithEmailAndPassword(auth, cred.email, cred.password).then(
        () => {
          const ath = getAuth();
          console.log(ath.currentUser.uid);
          //alert("Login");

          onSnapshot(collRef, (snapshot) => {
            snapshot.docs.map((val) => {
              if (ath.currentUser.uid === val.data().uuid) {
                console.log(val.data().role);
                if (val.data().role === "user") {
                  dispatch(setLoaderVisible(false));
                  navigate("/userdashboard");
                }
                if (val.data().role === "admin") {
                  dispatch(setLoaderVisible(false));
                  navigate("/admindashboard");
                }
              }
            });
          });

          setCred({
            email: "",
            password: "",
          });
        }
      );
      //   const Docref=doc(db,"users", {mobile:"1231231231"} )
      //   await getDoc(Docref).then((doc)=>{
      //     console.log(doc.data());
      //   })
    } catch (e) {
      console.log(e);
      setShowALert(true);
      dispatch(setLoaderVisible(false));
    }
  }

  const testData = async () => {
    const data = {
      name: "admin1",
      role: "admin",
      email: "admin1@email.com",
      password: "123",
      mobile: "1231231232",
      browserHistory: [
        {
          name: "",
          date: "",
        },
      ],
      issueHistory: [
        {
          bookName: "",
          issueDate: "",
          returnDate: "",
        },
      ],
      favourites: [
        {
          bookName: "",
          bookId: "",
        },
      ],
    };

    console.log(data);
    alert("");
    await addDoc(userCollectionRef, data);
  };
  const getUSersFromStore = async () => {
    setUsers(await getDocs(userCollectionRef));
  };

  useEffect(() => {
    getUSersFromStore();
    dispatch(setLoaderVisible(false));
  }, []);
  useEffect(() => {
    users.forEach((doc) => {
      //console.log(doc.data());
      alltheData.push(doc.data());
    });
    //console.log(alltheData);
  }, [users]);

  return (
    <>
      <div className="loginDivcont">
        <form className="form">
          {/* <TextField
          
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            value={cred.email}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            type="password"
            label="Passowrd"
            variant="outlined"
            name="password"
            value={cred.password}
            onChange={handleChange}
          /> */}
          <input
            className="input"
            placeholder="Email"
            name="email"
            value={cred.email}
            onChange={handleChange}
          />
          <input
            className="input"
            type="password"
            placeholder="Passowrd"
            name="password"
            value={cred.password}
            onChange={handleChange}
          />
          {/* <Button type="submit" onClick={handleSubmit} variant="outlined">
            Submit
          </Button> */}
          <button type="submit" className="btn" onClick={handleSubmit}>Sign In</button>
          <a href="" className="forgot"><p>Forgeot Password ?</p></a>
          {showALert ? <Alert severity="error">Login Failed</Alert> : null}
        </form>

        {/* <Button  onClick={testData} variant="outlined">
            Send Test Data
          </Button> */}
      </div>
    </>
  );
};

export default Login;
