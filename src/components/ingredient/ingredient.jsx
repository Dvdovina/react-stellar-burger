import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css"
import { ingredientPropType } from "../../utils/prop-types";
import { useMemo } from "react";
import { useSelector } from 'react-redux';


const Ingredient = ({ item, current }) => {

    const { ingredients, bun } = useSelector(
        (store) => store.userBurgerIngredients,
    );

    const ingredientsCounter = {}


    return (
        <>
            <li className={ingredientStyles.item} onClick={() => current(item)}>
                <Counter count={1} size="default" className={ingredientStyles.counter} extraClass="m-1" />
                <img src={item.image} alt={`Изображение ${item.name}`} />
                <div className={`pb-2 pt-2 ${ingredientStyles.price}`}>
                    <p className="text text_type_digits-default pr-2">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default ${ingredientStyles.text}`}>{item.name}</p>
            </li>
        </>
    )
}

Ingredient.propTypes = {
    item: ingredientPropType.isRequired,
};

export default Ingredient