import orderCardStyles from './orderCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from 'react';
import OrderIcons from '../order-icons/order-icons';


function OrderCard({ order }) {

    const location = useLocation();

    const allIngredients = useSelector((state) => state.ingredients.ingredients);

    const { name, number, createdAt, _id, ingredients } = order

    const orderIngredients = useMemo(() => {
        if (ingredients) {
            return ingredients.map((id) =>
                allIngredients.find((item) => item._id === id)
            );
        }
    }, [allIngredients]);

    const totalPrice = orderIngredients.reduce(
        (acc, i) =>
            acc + (i?.price || 0),
        0
    );

    const sortedIngredients = orderIngredients.slice(0, 5);

    const loadIngredients = () => {
        return sortedIngredients.map((item, i) => (
            <div key={i} className={orderCardStyles.img} style={{ backgroundImage: `url('${item?.image_mobile}')` }} />
        ));
    };

    return (
        <Link state={{ background: location }} to={`/profile/orders/${_id}`} className={orderCardStyles.link}>
            <li className={orderCardStyles.card}>
                <div className={orderCardStyles.text_box}>
                    <span className="text text_type_digits-default">#{number}</span>
                    <span className="text text_type_main-small text_color_inactive">
                        <FormattedDate date={new Date(createdAt)} />
                    </span>
                </div>
                <div className={orderCardStyles.info_box}>
                    <p className="text text_type_main-medium">{name}</p>
                    <p className={`text text_type_main-default ${orderCardStyles.done}`}>Выполнен</p>
                </div>
                <div className={orderCardStyles.icons_box}>
                    <ul className={orderCardStyles.imgs_list} >
                    {loadIngredients()}
                        {orderIngredients.length > 5 && (
                            <OrderIcons orderIngredients={orderIngredients}/>
                        )}
                    </ul>
                    <div className={orderCardStyles.price}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </li>
        </Link>
    )

}


export default OrderCard