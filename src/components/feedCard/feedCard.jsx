import feedCardStyles from './feedCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import testIcon from '../../images/ingredientTest.svg'
import { useLocation, Link } from "react-router-dom";


function FeedCard() {

    const location = useLocation();


    //Дата Заказа
    const today = new Date()
    const fiveDaysAgo = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 5,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    )


    return (
        <Link state={{ background: location }} to={'/feed/:id'} className={feedCardStyles.link}>
            <li className={feedCardStyles.card}>
                <div className={feedCardStyles.text_box}>
                    <span className="text text_type_digits-default">#12345</span>
                    <span className="text text_type_main-small text_color_inactive">
                        <FormattedDate date={fiveDaysAgo} />
                    </span>
                </div>
                <p className="text text_type_main-medium">Тестовое Название Заказа</p>
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