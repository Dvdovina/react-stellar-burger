import ordersStyles from './orders.module.css'
import OrderCard from '../orderCard/orderCard'

interface Props {
    orders: any[];
 }
const Orders: React.FC<Props> = ({ orders }) => {

    return (
        <div className={ordersStyles.container}>
            <ul className={`custom-scroll ${ordersStyles.order_list}`}>
                {orders.map((order, key) => (
                    <OrderCard key={key} order={order} />
                ))}
            </ul>
        </div>
    )
}


export default Orders