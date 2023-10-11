import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css"
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";


const Ingredient = ({ item, current }) => {

    const { ingredients, bun } = useSelector(
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

    return (
            <Link state={{ background: location }} to={`/ingredients/${item._id}`} className={ingredientStyles.link} onClick={() => current(item)} ref={dragRef} style={{ isDrag }} id={_id}>
                <li className={ingredientStyles.item} >
                    {!!counter && <Counter count={counter} size="default" className={ingredientStyles.counter} extraClass="m-1" />}
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