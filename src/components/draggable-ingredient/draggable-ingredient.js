import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import draggableIngredientStyles from './draggable-ingredient.module.css';
import { deleteIngredient } from "../../services/constructorSlice";


const DraggableIngredient = ({ item }) => {

    const dispatch = useDispatch();

    const { ingredients } = useSelector(
        (store) => store.userBurgerIngredients,
    );

    // Деструктуризация ингредиента
    const { _id, name, price, image } = item

     // Перетаскивание ингредиентов внутри конструктора через drag
     const [{ onDrag }, dragElRef] = useDrag({
        type: 'constructor',
        item: () => ({ id: item._id, index }),
        collect: monitor => ({
            onDrag: monitor.isDragging() ? .5 : 1
        })
    })








    return (
        <>
            <div className={draggableIngredientStyles.item} style={{ onDrag }}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => dispatch(deleteIngredient(_id))}
                />
            </div>
        </>
    )
}

export default DraggableIngredient