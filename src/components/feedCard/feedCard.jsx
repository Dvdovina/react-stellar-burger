import feedCardStyles from './feedCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import testIcon from '../../images/ingredientTest.svg'
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from 'react';


function FeedCard({ order }) {

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
                    <ul className={feedCardStyles.imgs_list} >
                        <li className={feedCardStyles.icons} >
                            <img
                                src={testIcon}
                                alt='тестовое изображение'
                                className={feedCardStyles.img}
                            />
                        </li>
                    </ul>
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