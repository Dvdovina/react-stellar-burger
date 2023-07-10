import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import ErrorPage from "../pages/error-page/error-page";
import Profile from "../pages/profile/profile";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";
import IngredientPage from "../pages/ingredient-page/ingredient-page";
import { getUser } from "../../services/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Protected from "../protected-route-element/protected-route-element";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { fetchIngredients } from "../../services/ingredientsSlice";


function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const background = location.state && location.state.background;

  useEffect(() => {
    try {
      if (localStorage.getItem('accessToken')) {
        dispatch(getUser())
        dispatch(fetchIngredients())
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleCloseModal = () => {
    navigate(-1);
  };


  return (
    <div className={`custom-scroll ${styles.app}`}>
      <AppHeader />
      <Routes location={background || location} >
        <Route path='/' element={<Home />} />
        <Route path='/ingredients/:id'element={<IngredientPage />} />
        <Route path='/profile' element={<Protected><Profile /></Protected>} />
        <Route path='/login' element={<Protected onlyUnAuth><Login /></Protected>} />
        <Route path='/register' element={<Protected onlyUnAuth><Register /></Protected>} />
        <Route path='/forgot-password' element={<Protected onlyUnAuth><ForgotPassword /></Protected>} />
        <Route path='/reset-password' element={<Protected onlyUnAuth><ResetPassword /></Protected>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {background && (
      <Routes>
        <Route path='/ingredients/:id' element={<Modal onClose={handleCloseModal}><IngredientDetails /></Modal>} />
      </Routes>
        )}
    </div>
  );
}

export default App;
