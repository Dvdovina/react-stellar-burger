import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import draggableIngredientStyles from './draggable-ingredient.module.css';
import { deleteIngredient } from "../../services/constructorSlice";


const DraggableIngredient = ({ item, moveItem }) => {

    const dispatch = useDispatch();

    const { ingredients } = useSelector(
        (store) => store.userBurgerIngredients,
    );

    // Деструктуризация ингредиента
    const { _id, name, price, image } = item


    const ref = useRef(null);
    const index = ingredients.indexOf(item);

    // Перетаскивание ингредиентов внутри конструктора --- drag
    const [{ isDragging }, drag] = useDrag({
        type: 'constructor',
        item: () => ({ id: item._id, index }),
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? .5 : 1;

    // Перетаскивание ингредиентов внутри конструктора --- drop
    const [{ handlerId }, drop] = useDrop({
        accept: 'constructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    //Общая переменная перетаскивания

    const dragDropRef = drag(drop(ref));

    return (
        <>
            <div
                className={draggableIngredientStyles.item}
                style={{ opacity }}
                ref={dragDropRef}
                data-handler-id={handlerId}
            >
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