import styles from "./app.module.css";
// import { data } from "../../utils/data";
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/api";

function App() {
  const [burgerData, setBurgerData] = useState([]);

  const getBurgerData = () => {
    getData()
      .then((res) => {
        setBurgerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getBurgerData();
  }, []);

  return (
    <div className={`custom-scroll ${styles.app}`}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={burgerData} />
        <BurgerConstructor ingredients={burgerData} />
      </main>
    </div>
  );
}

export default App;
