import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Ingredient from "../ingredient/ingredient";
import ingredientsStyles from "./burger-ingredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients(props) {
    const [current, setCurrent] = useState('buns');

    const buns = props.data.filter((ingredient) => ingredient.type === 'bun');
    const sauces = props.data.filter((ingredient) => ingredient.type === 'sauce');
    const mains = props.data.filter((ingredient) => ingredient.type === 'main');


    return (
        <>
            <section className={ingredientsStyles.section}>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={ingredientsStyles.tab}>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={`custom-scroll ${ingredientsStyles.ingredients_box}`}>
                    <h2 className="text text_type_main-medium pt-5 pb-5">Булки</h2>
                    <ul className={`${ingredientsStyles.ingredients_list} pt-5 pb-5`}>
                        {buns.map((item) => (
                            <Ingredient key={item._id} data={item} />
                        ))}
                    </ul>
                    <h2 className="text text_type_main-medium pt-5 pb-5">Соусы</h2>
                    <ul className={`${ingredientsStyles.ingredients_list} pt-1 pb-5`}>
                        {sauces.map((item) => (
                            <Ingredient key={item._id} data={item} />
                        ))}
                    </ul>
                    <h2 className="text text_type_main-medium pt-5 pb-5">Начинки</h2>
                    <ul className={`${ingredientsStyles.ingredients_list} pt-5 pb-5`}>
                        {mains.map((item) => (
                            <Ingredient key={item._id} data={item} />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    props: PropTypes.arrayOf(ingredientPropType).isRequired,
};


export default BurgerIngredients