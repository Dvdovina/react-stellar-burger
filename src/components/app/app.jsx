import styles from "./app.module.css";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from "../../services/ingredientsSlice";


function App() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(
    (store) => store.ingredients,
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={`custom-scroll ${styles.app}`}>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </main>
    </div>
  );
}

export default App;
