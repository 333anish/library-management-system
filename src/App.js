import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Error from './pages/Error';
import LoaderComp from './components/Loader';
import { useSelector } from 'react-redux';

function App() {

  let state=useSelector((state) => {
  return state.loaderState;
});
  return (
<>
 {
    (state)?<LoaderComp />:null
  }

<BrowserRouter>
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/adminDashboard" element={<AdminDashboard />} />
  <Route path="/userDashboard" element={<UserDashboard />} />
  <Route path="*" element={<Error />} />
</Routes>
</BrowserRouter>

</>
  );
}

export default App;
