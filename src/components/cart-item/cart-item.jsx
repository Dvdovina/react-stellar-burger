import cartItemStyles from './cart-item.module.css'
import testIcon from '../../images/ingredientTest.svg'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function CartItem({ ingredient }) {

    return (
        <li className={cartItemStyles.item} key={ingredient._id}>
            <img
                src={testIcon}
                alt='тестовое изображение'
            />
            <p className="text text_type_main-small">{ingredient.name}</p>
            <div className={cartItemStyles.price_box}>
                <span className="text text_type_digits-default pr-3">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
        </li>
    )
}

export default CartItem