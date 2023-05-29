import constructorStyles from "./burger-constructor.module.css"
import { DragIcon, CurrencyIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useState, useMemo, useContext } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerIngredientsContext } from "../../services/burgerIngredientsContext";



function BurgerConstructor() {

    const ingredients = useContext(BurgerIngredientsContext)
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const bun = ingredients.find(item => item.type === 'bun');
    const ingredient = ingredients.filter(item => item.type !== 'bun');

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
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                        <div className={`custom-scroll thin_scroll ${constructorStyles.scroll}`}>
                            <ul className={constructorStyles.list}>
                                {ingredient.map((item) => (
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
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    </>
                )}
                <div className={`pt-10 pr-8 ${constructorStyles.checkout}`}>
                    <div className={constructorStyles.price}>
                        <p className="text text_type_digits-medium pr-2">{fullPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
                    {isOpen &&
                        (<Modal onClose={handleCloseModal}>
                            <OrderDetails />
                        </Modal>)
                    }
                </div>
            </section>
        </>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor

