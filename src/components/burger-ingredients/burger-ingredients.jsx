import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Ingredient from "../ingredient/ingredient";
import ingredientsStyles from "./burger-ingredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { BurgerIngredientsContext } from "../../services/burgerIngredientsContext";


function BurgerIngredients() {

    const ingredients = useContext(BurgerIngredientsContext)

    const [isOpen, setIsOpen] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);

    const handleOpenModal = (item) => {
        setIsOpen(true);
        setCurrentIngredient(item);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setCurrentIngredient(null);
    };

    const [current, setCurrent] = useState("buns");

    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
    const mains = ingredients.filter((ingredient) => ingredient.type === 'main');

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
                {isOpen &&
                    (<Modal onClose={handleCloseModal}>
                        <IngredientDetails currentIngredient={currentIngredient} />
                    </Modal>)
                }
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients