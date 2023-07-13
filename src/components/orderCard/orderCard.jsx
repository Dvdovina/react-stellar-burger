import orderCardStyles from './orderCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import testIcon from '../../images/ingredientTest.svg'


function OrderCard() {

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
        <li className={orderCardStyles.card}>
            <div className={orderCardStyles.text_box}>
                <span className="text text_type_digits-default">#12345</span>
                <span className="text text_type_main-small text_color_inactive">
                    <FormattedDate date={fiveDaysAgo} />
                </span>
            </div>
            <div className={orderCardStyles.info_box}>
                <p className="text text_type_main-medium">Тестовое Название Заказа</p>
                <p className={`text text_type_main-default ${orderCardStyles.done}`}>Выполнен</p>
            </div>
            <div className={orderCardStyles.icons_box}>
                <div className={orderCardStyles.imgs} >
                    <img
                        src={testIcon}
                        alt='тестовое изображение'
                        className={orderCardStyles.img}
                    />
                    <img
                        src={testIcon}
                        alt='тестовое изображение'
                        className={orderCardStyles.img}
                    />
                    <img
                        src={testIcon}
                        alt='тестовое изображение'
                        className={orderCardStyles.img}
                    />
                    <img
                        src={testIcon}
                        alt='тестовое изображение'
                        className={orderCardStyles.img}
                    />
                    <img
                        src={testIcon}
                        alt='тестовое изображение'
                        className={orderCardStyles.img}
                    />
                </div>
                <div className={orderCardStyles.price}>
                    <p className="text text_type_digits-default">100</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>
    )
}


export default OrderCard