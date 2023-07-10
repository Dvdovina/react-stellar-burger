import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Home from "../pages/home/home";
import IngredientPage from "../pages/ingredient-page/ingredient-page";
import Login from "../pages/login/login";
import ErrorPage from "../pages/error-page/error-page";
import Profile from "../pages/profile/profile";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";
import { getUser } from "../../services/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Protected from "../protected-route-element/protected-route-element";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    try {
      if (localStorage.getItem('accessToken')) {
        dispatch(getUser())
      }
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <div className={`custom-scroll ${styles.app}`}>
      <AppHeader />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/profile' element={<Protected><Profile /></Protected>} />
        <Route path='/login' element={<Protected onlyUnAuth><Login /></Protected>} />
        <Route path='/register' element={<Protected onlyUnAuth><Register /></Protected>} />
        <Route path='/forgot-password' element={<Protected onlyUnAuth><ForgotPassword /></Protected>} />
        <Route path='/reset-password' element={<Protected onlyUnAuth><ResetPassword /></Protected>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
