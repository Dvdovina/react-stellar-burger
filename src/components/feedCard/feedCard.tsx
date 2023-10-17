import feedCardStyles from './feedCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, Link } from "react-router-dom";
import { useMemo } from 'react';
import OrderIconsOverlay from '../order-icons-overlay/order-icons-overlay';
import { TOrder } from '../../utils/common-types';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/useForm';


interface IFeedCard {
    order: TOrder;
  }


const FeedCard: FC<IFeedCard> = ({ order }) => {

    const location = useLocation();

    const allIngredients = useAppSelector((state) => state.ingredients.ingredients);

    const { name, number, createdAt, _id, ingredients } = order

    const orderIngredients = useMemo(() => {
        if (ingredients) {
            return ingredients.map((id) =>
                allIngredients.find((item) => item._id === id)
            );
        }
    }, [allIngredients]);

    const totalPrice = orderIngredients?.reduce(
        (acc, i) =>
            acc + (i?.price || 0),
        0
    );

    const sortedIngredients = orderIngredients?.slice(0, 5);

    const loadIngredientsIcons = () => {
        return sortedIngredients?.map((item, i) => (
            <div key={i} className={feedCardStyles.img} style={{ backgroundImage: `url('${item?.image_mobile}')` }} />
        ));
    };

    return (
        <Link state={{ background: location }} to={`/feed/${_id}`} className={feedCardStyles.link}>
            <li className={feedCardStyles.card}>
                <div className={feedCardStyles.text_box}>
                    <span className="text text_type_digits-default">#{number}</span>
                    <span className="text text_type_main-small text_color_inactive">
                        <FormattedDate date={new Date(createdAt)} />
                    </span>
                </div>
                <p className="text text_type_main-medium">{name}</p>
                <div className={feedCardStyles.icons_box}>
                    <div className={feedCardStyles.imgs_list} >
                        {loadIngredientsIcons()}
                    </div>
                    {orderIngredients!.length > 5 && (
                        <OrderIconsOverlay orderIngredients={orderIngredients} />
                    )}
                    <div className={feedCardStyles.price}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </li>
        </Link>
    )
}


export default FeedCard