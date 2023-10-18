import orderModalStyles from './order-modal.module.css'
import CartItem from '../cart-item/cart-item'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { FC } from 'react'
import { TOrder } from '../../utils/common-types'
import { useAppSelector } from '../../hooks/useForm'

interface IOrderModal {
    orders: TOrder[]
}


const OrderModal: FC<IOrderModal> = ({ orders }) => {

    const { id } = useParams();

    const order = orders.find((order) => order._id === id);

    const { name, number, createdAt, _id, ingredients, status } = order as TOrder

    const allIngredients = useAppSelector((state) => state.ingredients.ingredients);

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

    const setTextColor = () => {
        if (status === "done") {
            return `text text_type_main-default pb-15 ${orderModalStyles.done}`
        } else if (status === "created") {
            return `text text_type_main-default pb-15 ${orderModalStyles.created}`
        }
        else if (status === "pending") {
            return `text text_type_main-default pb-15 ${orderModalStyles.created}`
        }
    }

    return (
        <div className={orderModalStyles.container}>
            <span className={`${orderModalStyles.number} text text_type_digits-default pb-10`}>#{number}</span>
            <p className="text text_type_main-medium pb-3">{name}</p>
            <p className={setTextColor()}>{status === 'done' ? 'Выполнен' : 'Готовится'}</p>
            <p className="text text_type_main-medium pb-6">Состав:</p>
            <ul className={`custom-scroll ${orderModalStyles.cart_list}`}>
                {orderIngredients?.map((ingredient, key) => (
                    <CartItem ingredient={ingredient} key={key} />
                ))}
            </ul>
            <div className={`pt-10 ${orderModalStyles.info_box}`}>
                <span className="text text_type_main-small text_color_inactive">
                    <FormattedDate date={new Date(createdAt)} />
                </span>
                <div className={orderModalStyles.price_box}>
                    <p className="text text_type_digits-default">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}


export default OrderModal