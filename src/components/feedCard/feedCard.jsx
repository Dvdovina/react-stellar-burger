import feedCardStyles from './feedCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import testIcon from '../../images/ingredientTest.svg'
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";


function FeedCard({ order }) {

    const location = useLocation();

    const { ingredients } = useSelector(
        (store) => store.ingredients);

    const { name, number, createdAt, _id } = order

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
                    <div className={feedCardStyles.imgs} >
                        <img
                            src={testIcon}
                            alt='тестовое изображение'
                            className={feedCardStyles.img}
                        />
                        <img
                            src={testIcon}
                            alt='тестовое изображение'
                            className={feedCardStyles.img}
                        />
                        <img
                            src={testIcon}
                            alt='тестовое изображение'
                            className={feedCardStyles.img}
                        />
                        <img
                            src={testIcon}
                            alt='тестовое изображение'
                            className={feedCardStyles.img}
                        />
                        <img
                            src={testIcon}
                            alt='тестовое изображение'
                            className={feedCardStyles.img}
                        />
                    </div>
                    <div className={feedCardStyles.price}>
                        <p className="text text_type_digits-default">100</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </li>
        </Link>
    )
}


export default FeedCard