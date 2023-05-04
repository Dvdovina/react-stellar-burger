import constructorStyles from "./burger-constructor.module.css"
import { DragIcon, CurrencyIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";



function BurgerConstructor(props) {

    const bun = props.data.find(item => item.type === 'bun');
    const ingredient = props.data.filter(item => item.type !== 'bun');


    return (
        <>
            <section className={` ${constructorStyles.section} pt-5 pl-4 pr-4`}>
                <div className={` ${constructorStyles.buns} pb-5 pr-5`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
                <div className={`custom-scroll ${constructorStyles.scroll}`}>
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
                <div className={` ${constructorStyles.buns} pb-5 pr-5 pt-5`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
                <div className={`pt-10 pr-8 ${constructorStyles.checkout}`}>
                    <div className={constructorStyles.price}>
                        <p className="text text_type_digits-medium pr-2">610</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
                </div>
            </section>
        </>
    )
}

BurgerConstructor.propTypes = {
    props: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor

