import orderCardStyles from './orderCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from 'react';
import OrderIconsOverlay from '../order-icons-overlay/order-icons-overlay';


function OrderCard({ order }) {

    const location = useLocation();

    const allIngredients = useSelector((state) => state.ingredients.ingredients);

    const { name, number, createdAt, _id, ingredients, status } = order

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

    const loadIngredientsIcons = () => {
        return sortedIngredients.map((item, i) => (
            <div key={i} className={orderCardStyles.img} style={{ backgroundImage: `url('${item?.image_mobile}')` }} />
        ));
    };

    const setTextColor = () => {
        if (status === "done") {
            return `text text_type_main-default ${orderCardStyles.done}`
        } else if (status === "created") {
            return `text text_type_main-default ${orderCardStyles.created}`
        }
        else if (status === "pending") {
            return `text text_type_main-default ${orderCardStyles.created}`
        }
    }

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
                    <p className={setTextColor()}>{status === 'done' ? 'Выполнен' : 'Готовится'}</p>
                </div>
                <div className={orderCardStyles.icons_box}>
                    <div className={orderCardStyles.imgs_list} >
                        {loadIngredientsIcons()}
                    </div>
                    {orderIngredients.length > 5 && (
                        <OrderIconsOverlay orderIngredients={orderIngredients} />
                    )}
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