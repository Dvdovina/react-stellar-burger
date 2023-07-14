import cartItemStyles from './cart-item.module.css'
import testIcon from '../../images/ingredientTest.svg'
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function CartItem() {

    return (
        <li className={cartItemStyles.item}>
            <img
                src={testIcon}
                alt='тестовое изображение'
            />
            <p className="text text_type_main-small">Тестовое Название Ингрединта</p>
            <div className={cartItemStyles.price_box}>
                <span className="text text_type_digits-default pr-3">2 x 200</span>
                <CurrencyIcon type="primary" />
            </div>
        </li>
    )
}

export default CartItem