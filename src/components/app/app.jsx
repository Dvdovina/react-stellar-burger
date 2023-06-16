import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Home from "../pages/home/home";
import IngredientPage from "../pages/ingredient-page/ingredient-page";
import Login from "../pages/login/login";
import NotFoundPage from "../pages/not-found-page/not-found-page";
import Profile from "../pages/profile/profile";
import Register from "../pages/register/register";
import ResetPassword from "../pages/reset-password/reset-password";


function App() {

  return (
    <div className={`custom-scroll ${styles.app}`}>
      <AppHeader />
      <main className={styles.main}>
        <Router>
          <Route path='/' element={<Home />} />
          <Route path='/ingredients/:id' element={<IngredientPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='*' element={<NotFoundPage />} />
        </Router>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>

      </main>
    </div>
  );
}

export default App;
