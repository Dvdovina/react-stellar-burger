import orderModalStyles from './order-modal.module.css'
import CartItem from '../cart-item/cart-item'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

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

function OrderModal() {

    return (
        <div className={orderModalStyles.container}>
            <span className={`${orderModalStyles.number} text text_type_digits-default pb-10`}>#12345</span>
            <p className="text text_type_main-medium pb-3">Тестовое Название Заказа</p>
            <p className={`text text_type_main-default pb-15 ${orderModalStyles.done}`}>Выполнен</p>
            <p className="text text_type_main-medium pb-6">Состав:</p>
            <ul className={`custom-scroll ${orderModalStyles.cart_list}`}>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </ul>
            <div className={`pt-10 ${orderModalStyles.info_box}`}>
                <span className="text text_type_main-small text_color_inactive">
                    <FormattedDate date={fiveDaysAgo} />
                </span>
                <div className={orderModalStyles.price_box}>
                    <p className="text text_type_digits-default">10000</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}


export default OrderModal