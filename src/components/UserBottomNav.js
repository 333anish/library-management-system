import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import BooksList from './BooksList';
import UserList from './UserList';
import BorrowerHistory from './BorrowerHistory';
import { Button } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../redux/slices/loaderSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../styles/adminDashboard.css"
import HistoryIcon from '@mui/icons-material/History';

export default function UserBottomnav() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  
const signoutuser = async ()=>{
    dispatch(setLoaderVisible(true))
    const auth=getAuth()
    signOut(auth).then(() => {
        dispatch(setLoaderVisible(false))
        navigate("/")
      }).catch((error) => {
        // An error happened.
        alert("Error While Logging out")
      });
}
  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <div className='adminDashMainCont' style={{border:"0px solid black" , width:"100%" ,  height:"91vh"}}>
      {
        (value==0)?null:null
      }
      {
        (value==1)?null:null
      }
      {
        (value==2)?null:null
      }
      </div>
     
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            
          }}
        >
          <BottomNavigationAction label="Books" icon={<MenuBookIcon />} />
          <BottomNavigationAction label="Favourite" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Borrow History" icon={<HistoryIcon />} />
          <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={signoutuser} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

