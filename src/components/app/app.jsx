import styles from "./app.module.css";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
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


  if (ingredientsError) {
    return <span className={`${styles.error} text_type_main-medium`}>Ошибка загрузки данных.
      Приносим свои извинения,попробуйте перезагрузить страницу.</span>;
  } else if (ingredientsStatus) {
    return <p className={'pt-5 pl-5'}> Загрузка...</p>;
  } else {
    return (
      <div className={`custom-scroll ${styles.app}`}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor ingredients={ingredients} />
        </main>
      </div>
    );
  }
}
export default App;
