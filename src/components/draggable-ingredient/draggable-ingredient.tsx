
import { useDrag, useDrop, DropTargetOptions } from "react-dnd";
import { useRef } from "react";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import draggableIngredientStyles from './draggable-ingredient.module.css';
import { deleteIngredient } from "../../services/constructorSlice";
import { FC } from "react";
import { useAppSelector } from "../../hooks/useForm";
import { useAppDispatch } from "../../hooks/useForm";
import { TIngredient } from "../../utils/common-types";

interface IDraggableIngredient {
    item: TIngredient
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}


const DraggableIngredient: FC<IDraggableIngredient> = ({ item, moveItem }) => {

    const dispatch = useAppDispatch();

    const { ingredients } = useAppSelector(
        (store) => store.userBurgerIngredients,
    );

    // Деструктуризация ингредиента
    const { _id, name, price, image } = item


    const ref = useRef<HTMLDivElement>(null);
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
        hover(item: TIngredient, monitor: DropTargetOptions) {
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

    drag(drop(ref));

    return (
        <>
            <div
                className={draggableIngredientStyles.item}
                style={{ opacity }}
                ref={ref}
                data-handler-id={handlerId}
            >
                <DragIcon type="primary" />
                <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => dispatch(deleteIngredient(item.id))}
                />
            </div>
        </>
    )
}

export default DraggableIngredient