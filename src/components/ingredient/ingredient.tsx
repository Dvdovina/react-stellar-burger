import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css"
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import { FC } from "react";
import { useAppSelector } from "../../hooks/useForm";
import { TIngredient } from "../../utils/common-types";


interface IIngredient {
    item: TIngredient;
    current: (item: TIngredient) => void;
}

const Ingredient: FC<IIngredient> = ({ item, current }) => {

    const { ingredients, bun } = useAppSelector(
        (store) => store.userBurgerIngredients,
    );
    const location = useLocation();

    // Деструктуризация ингредиента
    const { _id, name, price, image } = item

    //счетчик (Optional chaining)
    const counter = [bun, ...ingredients, bun].filter((i) => i?._id === _id).length

    // Перетаскивание ингредиентов через drag
    const [{ isDrag }, dragRef] = useDrag({
        type: 'item',
        item: { ...item },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    const opacity = isDrag ? 0.5 : 1;

    return (
        <Link state={{ background: location }} to={`/ingredients/${item._id}`} className={ingredientStyles.link} onClick={() => current(item)} ref={dragRef} style={{ opacity }} id={_id}>
            <li className={ingredientStyles.item} >
                {!!counter && <Counter count={counter} size="default" extraClass="m-1" />}
                <img src={image} alt={`Изображение ${name}`} />
                <div className={`pb-2 pt-2 ${ingredientStyles.price}`}>
                    <p className="text text_type_digits-default pr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default ${ingredientStyles.text}`}>{name}</p>
            </li>
        </Link>
    )
}



export default Ingredient