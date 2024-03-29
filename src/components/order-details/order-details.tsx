import orderStyles from "./order-details.module.css"
import checkMarkGraphics from "../../images/graphics.svg"
import { useAppSelector } from "../../hooks/useForm";


function OrderDetails() {

    const { orderNumber } = useAppSelector(
        (store) => store.order);

    return (
        <>
            <ul className={orderStyles.container}>
                <li className={orderStyles.detail}>
                    <p className={`${orderStyles.number} text text_type_digits-large pb-5`}>{orderNumber}</p>
                    <p className="text text_type_main-medium pt-3">идентификатор заказа</p>
                </li>
                <li className={orderStyles.detail}>
                    <img src={checkMarkGraphics} alt='Иконка с галочкой'></img>
                </li>
                <li className={orderStyles.detail}>
                    <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на орбитальной станции</p>
                </li>
            </ul>
        </>
    )
}

export default OrderDetails