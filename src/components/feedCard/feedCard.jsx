import feedCardStyles from './feedCard.module.css'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'




function FeedCard() {


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
        <li className={feedCardStyles.card}>
            <div className={feedCardStyles.text_box}>
                <span className="text text_type_digits-default">#12345</span>
                <span className="text text_type_main-small text_color_inactive">
                    <FormattedDate date={fiveDaysAgo} />
                </span>
            </div>
            <p className="text text_type_main-medium pb-6">Тестовое Название Заказа</p>

        </li>
    )
}


export default FeedCard