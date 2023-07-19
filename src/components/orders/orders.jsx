import ordersStyles from './orders.module.css'
import OrderCard from '../orderCard/orderCard'


function Orders({ orders }) {

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