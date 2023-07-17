import { useState, useMemo } from "react";
import Ingredient from "../ingredient/ingredient";
import ingredientsStyles from "./burger-ingredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { showIngredient} from "../../services/currentIngredientSlice"
import { useInView } from "react-intersection-observer";


function BurgerIngredients() {

    const dispatch = useDispatch();

    //ингредиенты из стора
    const { ingredients, ingredientsError } = useSelector(
        (store) => store.ingredients);

    //Модальные окна
    const handleOpenModal = (item) => {
        dispatch(showIngredient(item))
    };

    //перебор ингредиентов по типу
    const buns = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'sauce'), [ingredients]);
    const mains = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'main'), [ingredients]);

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

    //реализация подсвечивания переключателя табов
    const [bunsRef, bunsInView] = useInView({ threshold: .1 });
    const [saucesRef, saucesInView] = useInView({ threshold: .9 });
    const [mainsRef, mainsInView] = useInView({ threshold: 0.2 });

    return (
            <section className={ingredientsStyles.section}>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={ingredientsStyles.tab}>
                    <Tab value="buns" active={bunsInView === true} onClick={tabScroll}>
                        Булки
                    </Tab>
                    <Tab value="sauces" active={saucesInView === true} onClick={tabScroll}>
                        Соусы
                    </Tab>
                    <Tab value="mains" active={mainsInView === true} onClick={tabScroll}>
                        Начинки
                    </Tab>
                </div>
                {ingredientsError ? (
                    <span className={`${ingredientsStyles.error} text text_type_main-default`}>Ошибка загрузки данных.
                        Попробуйте перезагрузить страницу.</span>
                ) : (
                    <div className={`custom-scroll ${ingredientsStyles.ingredients_box}`}>
                        <h2 id="buns" className="text text_type_main-medium pt-5 pb-5">Булки</h2>
                        <ul className={`${ingredientsStyles.ingredients_list} pt-5 pb-5`} ref={bunsRef}>
                            {buns.map((item) => (
                                <Ingredient key={item._id} item={item} current={handleOpenModal} />
                            ))}
                        </ul>
                        <h2 id="sauces" className="text text_type_main-medium pt-5 pb-5">Соусы</h2>
                        <ul className={`${ingredientsStyles.ingredients_list} pt-1 pb-5`} ref={saucesRef}>
                            {sauces.map((item) => (
                                <Ingredient key={item._id} item={item} current={handleOpenModal} />
                            ))}
                        </ul>
                        <h2 id="mains" className="text text_type_main-medium pt-5 pb-5">Начинки</h2>
                        <ul className={`${ingredientsStyles.ingredients_list} pt-5 pb-5`} ref={mainsRef}>
                            {mains.map((item) => (
                                <Ingredient key={item._id} item={item} current={handleOpenModal} />
                            ))}
                        </ul>
                    </div>
                )
                }
            </section>
    )
}


export default BurgerIngredients