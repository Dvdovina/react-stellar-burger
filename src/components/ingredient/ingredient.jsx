import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css"
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";


const Ingredient = ({ item, current }) => {

    const { ingredients, bun } = useSelector(
        (store) => store.userBurgerIngredients,
    );

    // Деструктуризация ингредиента
    const { _id, name, price, image } = item

    //счетчик (Optional chaining)
    const counter = [bun, ...ingredients].filter((i) => i?._id === _id).length

    // Перетаскивание ингредиентов через drag
    const [{ onDrag }, dragRef] = useDrag({
        type: 'item',
        item: { ...item },
        collect: monitor => ({
            onDrag: monitor.isDragging() ? .5 : 1
        })
    })

    return (
        <>
            <li className={ingredientStyles.item} onClick={() => current(item)} ref={dragRef} style={{ onDrag }} id={_id}>
                {!!counter && <Counter count={counter} size="default" className={ingredientStyles.counter} extraClass="m-1" />}
                <img src={image} alt={`Изображение ${name}`} />
                <div className={`pb-2 pt-2 ${ingredientStyles.price}`}>
                    <p className="text text_type_digits-default pr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default ${ingredientStyles.text}`}>{name}</p>
            </li>
        </>
    )
}

Ingredient.propTypes = {
    item: ingredientPropType.isRequired,
};

export default Ingredient