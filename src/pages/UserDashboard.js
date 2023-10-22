import React, { useEffect } from 'react'
import AdminBottomnav from '../components/AdminBottomnav'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoaderVisible } from '../redux/slices/loaderSlice'
import UserBottomnav from '../components/UserBottomNav'

const UserDashboard = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    const auth=getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //alert("already");
        dispatch(setLoaderVisible(false))
        const uid = user.uid;
        // ...
      } else {
        navigate("/")
      }
    });
  })
  return (
    <>
      <UserBottomnav />
    </>
  )
}

export default UserDashboard