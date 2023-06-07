import constructorStyles from "./burger-constructor.module.css"
import { CurrencyIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from 'react-redux';
import { hideOrderModal } from "../../services/orderSlice";
import { submitOrder } from "../../services/orderSlice";
import { nanoid } from '@reduxjs/toolkit'
import { useDrop } from 'react-dnd'
import { addIngredient, clearOrder } from "../../services/constructorSlice";

function BurgerConstructor() {

    const dispatch = useDispatch();

    const { ingredients, bun } = useSelector(
        (store) => store.userBurgerIngredients,
    );

    const { orderError } = useSelector(
        (store) => store.order);

    const { isOpen } = useSelector((state) => state.order);

    //Булки и ингредиенты вместе в корзине
    const cart = { ingredients, bun }

    //Открытие модального окна (state isOpen) и отправление заказа 
    const handleOpenModal = async () => {
        await dispatch(submitOrder(cart));
    };

    //Закрытие модального окна
    const handleCloseModal = () => {
        dispatch(hideOrderModal());
        dispatch(clearOrder());
    };

    //Блокировка кнопки при пустой корзине
    const isDisabled = useMemo(() => (cart.bun === null
        || cart.ingredients.length === 0), [cart]);

    //Функция подсчета цены
    const fullPrice = useMemo(() => {
        if (cart.bun !== null) {
            const bunPrice = cart.bun.price;
            const ingredientsPrice = cart.ingredients.reduce((total, item) => total + item.price, 0);
            return bunPrice * 2 + ingredientsPrice
        } else {
            return 0;
        }
    }, [cart.bun, cart.ingredients]);


    // Перетаскивание ингредиентов(конечная цель) через drop
    const [{ isActive }, dropRef] = useDrop({
        accept: 'item',
        collect: (monitor) => ({
            isActive: monitor.isOver()
        }),
        drop: (item) => {
            dispatch(addIngredient({
                ...item,
                dragId: nanoid()
            }))
        }
    })

    return (
        <>
            <section className={` ${constructorStyles.section} pt-5 pl-4 pr-4`} ref={dropRef} >
                <div className={` ${constructorStyles.buns} pb-5 pr-7`}>
                    {bun && (<ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        bun={bun}
                    />
                    )}
                </div>
                <div className={`custom-scroll thin_scroll ${constructorStyles.scroll}`}>
                    <ul className={constructorStyles.list}>
                        {ingredients.map((item) => (
                            <li key={item._id}>
                                <DraggableIngredient item={item} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={` ${constructorStyles.buns} pb-5 pr-7 pt-5`}>
                    {bun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            bun={bun}
                        />
                    )}
                </div>
                <div className={`pt-10 pr-8 ${constructorStyles.checkout}`}>
                    <div className={constructorStyles.price}>
                        <p className="text text_type_digits-medium pr-2">{fullPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal} disabled={isDisabled}>Оформить заказ</Button>
                    {orderError ? (
                        <span className={`${constructorStyles.error} text text_type_main-default`}>Ошибка загрузки данных!</span>
                    ) : (isOpen &&
                        (<Modal onClose={handleCloseModal}>
                            <OrderDetails />
                        </Modal>)
                    )
                    }
                </div>
            </section>
        </>
    )
}

export default BurgerConstructor

