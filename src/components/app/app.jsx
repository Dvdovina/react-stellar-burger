import styles from "./app.module.css";
// import { data } from "../../utils/data"; исходные данные без апи
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/api";


function App() {
  const [burgerData, setBurgerData] = useState([]);
  const [error, setError] = useState(false);

  const getBurgerData = () => {
    getData()
      .then((res) => {
        setBurgerData(res.data);
      })
      .catch(() => {
        setError(true);
      })
  };

  useEffect(() => {
    getBurgerData();
  }, []);

  return (
    <div className={`custom-scroll ${styles.app}`}>
      {error ? (
        <span className={`${styles.error} text_type_main-medium`}>Ошибка загрузки данных.
          Приносим свои извинения,попробуйте перезагрузить страницу.</span>
      ) : (
        <>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients ingredients={burgerData} />
            <BurgerConstructor ingredients={burgerData} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
