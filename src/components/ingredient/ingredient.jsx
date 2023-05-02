import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css"

const Ingredient = (props) => {
    return (
        <>
            <li className={ingredientStyles.item}>
                <Counter count={1} size="default" className={ingredientStyles.counter} extraClass="m-1" />
                <img src={props.data.image} alt={`Изображение ${props.data.name}`} />
                <div className={`pb-2 pt-2 ${ingredientStyles.price}`}>
                    <p className="text text_type_digits-default pr-2">{props.data.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default ${ingredientStyles.text}`}>{props.data.name}</p>
            </li>
        </>
    )
}

export default Ingredient