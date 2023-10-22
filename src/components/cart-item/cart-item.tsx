import cartItemStyles from './cart-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../utils/common-types'
import { FC } from 'react'

interface ICartItem {
    ingredient: TIngredient | undefined;
}

const CartItem: FC<ICartItem> = ({ ingredient }) => {

    return (
        <li className={cartItemStyles.item} key={ingredient?._id}>
            <img
                src={ingredient?.image_mobile}
                alt={ingredient?.name}
            />
            <p className="text text_type_main-small">{ingredient?.name}</p>
            <div className={cartItemStyles.price_box}>
                <span className="text text_type_digits-default pr-3">{ingredient?.price}</span>
                <CurrencyIcon type="primary" />
            </div>
        </li>
    )
}

export default CartItem