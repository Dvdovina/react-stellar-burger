import styles from "./app.module.css";
// import { data } from "../../utils/data"; исходные данные без апи
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/api";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from "../../services/ingredientsSlice";


function App() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsStatus, ingredientsError } = useSelector(
    (store) => store.ingredients,
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // const [burgerData, setBurgerData] = useState([]);
  // const [error, setError] = useState(false);

  // const getBurgerData = () => {
  //   getData()
  //     .then((res) => {
  //       setBurgerData(res.data);
  //     })
  //     .catch(() => {
  //       setError(true);
  //     })
  // };

  // useEffect(() => {
  //   getBurgerData();
  // }, []);

  return (
    <div className={`custom-scroll ${styles.app}`}>
      {ingredientsError ? (
        <span className={`${styles.error} text_type_main-medium`}>Ошибка загрузки данных.
          Приносим свои извинения,попробуйте перезагрузить страницу.</span>
      ) : (
        <>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
