import constructorStyles from "./burger-constructor.module.css"
import { DragIcon, CurrencyIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from 'react-redux';
import { showOrderModal, hideOrderModal } from "../../services/orderSlice";
import { submitOrder } from "../../services/orderSlice";

function BurgerConstructor() {

    const dispatch = useDispatch();

    const { ingredients, bun } = useSelector(
        (store) => store.userBurgerIngredients,
    );
    const { orderError } = useSelector(
        (store) => store.order);

    const { isOpen } = useSelector((state) => state.order);

    //id ingredients
    const ingredientsId = useMemo(() => ingredients.map((item) => item._id), [ingredients]);


    const handleOpenModal = () => {
       showOrderModal()
       dispatch(submitOrder(ingredientsId))
    };

    const handleCloseModal = () => {
        dispatch(hideOrderModal());
    };

    //Функция подсчета цены
    const fullPrice = useMemo(() => {
        return ingredients.reduce((total, item) => total + item.price, 0);
    }, [ingredients]);

    return (
        <>
            <section className={` ${constructorStyles.section} pt-5 pl-4 pr-4`}>
                {ingredients.length > 0 && (
                    <>
                        <div className={` ${constructorStyles.buns} pb-5 pr-7`}>
                            {bun && (<ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                            )}
                        </div>
                        <div className={`custom-scroll thin_scroll ${constructorStyles.scroll}`}>
                            <ul className={constructorStyles.list}>
                                {ingredients.map((item) => (
                                    item.type !== 'bun' &&
                                    <li className={constructorStyles.item} key={item._id}>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            text={item.name}
                                            price={item.price}
                                            thumbnail={item.image}
                                        />
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
                                />
                            )}
                        </div>
                    </>
                )}
                <div className={`pt-10 pr-8 ${constructorStyles.checkout}`}>
                    <div className={constructorStyles.price}>
                        <p className="text text_type_digits-medium pr-2">{fullPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
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

