import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css"
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";


const Ingredient = ({ingredients}) => {
    return (
        <>
            <li className={ingredientStyles.item}>
                <Counter count={1} size="default" className={ingredientStyles.counter} extraClass="m-1" />
                <img src={ingredients.image} alt={`Изображение ${ingredients.name}`} />
                <div className={`pb-2 pt-2 ${ingredientStyles.price}`}>
                    <p className="text text_type_digits-default pr-2">{ingredients.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default ${ingredientStyles.text}`}>{ingredients.name}</p>
            </li>
        </>
    )
}

Ingredient.propTypes = {
    ingredients: ingredientPropType.isRequired,
};

export default Ingredient