import { useState, useEffect } from "react";
import Ingredient from "../ingredient/ingredient";
import ingredientsStyles from "./burger-ingredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from 'react-redux';
import { showIngredient, hideIngredient } from "../../services/currentIngredientSlice"
import { fetchIngredients } from "../../services/ingredientsSlice";


function BurgerIngredients() {

    const dispatch = useDispatch();

    //api из стора
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    //ингредиенты из стора
    const { ingredients, ingredientsError } = useSelector(
        (store) => store.ingredients,
    );

    //стейт модального окна из стора
    const { isOpen } = useSelector((state) => state.currentIngredient);

    //Модальные окна
    const handleOpenModal = (item) => {
        dispatch(showIngredient(item))
    };

    const handleCloseModal = () => {
        dispatch(hideIngredient())
    };

    //перебор ингредиентов по типу
    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
    const mains = ingredients.filter((ingredient) => ingredient.type === 'main');

    //Стейт табов
    const [current, setCurrent] = useState("buns");

    //Элементы табов по ID
    const tabs = {
        "buns": document.querySelector("#buns"),
        "sauces": document.querySelector("#sauces"),
        "mains": document.querySelector("#mains")
    }

    //Скролл по-клику на табы
    const tabScroll = (item) => {
        setCurrent(item);
        if (item) tabs[item].scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section className={ingredientsStyles.section}>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={ingredientsStyles.tab}>
                    <Tab value="buns" active={current === "buns"} onClick={tabScroll}>
                        Булки
                    </Tab>
                    <Tab value="sauces" active={current === "sauces"} onClick={tabScroll}>
                        Соусы
                    </Tab>
                    <Tab value="mains" active={current === "mains"} onClick={tabScroll}>
                        Начинки
                    </Tab>
                </div>
                {ingredientsError ? (
                    <span className={`${ingredientsStyles.error} text text_type_main-default`}>Ошибка загрузки данных.
                        Попробуйте перезагрузить страницу.</span>
                ) : (
                    <div className={`custom-scroll ${ingredientsStyles.ingredients_box}`}>
                        <h2 id="buns" className="text text_type_main-medium pt-5 pb-5">Булки</h2>
                        <ul className={`${ingredientsStyles.ingredients_list} pt-5 pb-5`}>
                            {buns.map((item) => (
                                <Ingredient key={item._id} ingredients={item} current={handleOpenModal} />
                            ))}
                        </ul>
                        <h2 id="sauces" className="text text_type_main-medium pt-5 pb-5">Соусы</h2>
                        <ul className={`${ingredientsStyles.ingredients_list} pt-1 pb-5`}>
                            {sauces.map((item) => (
                                <Ingredient key={item._id} ingredients={item} current={handleOpenModal} />
                            ))}
                        </ul>
                        <h2 id="mains" className="text text_type_main-medium pt-5 pb-5">Начинки</h2>
                        <ul className={`${ingredientsStyles.ingredients_list} pt-5 pb-5`}>
                            {mains.map((item) => (
                                <Ingredient key={item._id} ingredients={item} current={handleOpenModal} />
                            ))}
                        </ul>
                    </div>
                )
                }
                {isOpen &&
                    (<Modal onClose={handleCloseModal}>
                        <IngredientDetails />
                    </Modal>)
                }
            </section>
        </>
    )
}


export default BurgerIngredients