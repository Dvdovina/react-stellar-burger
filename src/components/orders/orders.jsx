import ordersStyles from './orders.module.css'
import OrderCard from '../orderCard/orderCard'


function Orders() {

    return (
        <div className={ordersStyles.container}>
            <ul className={`custom-scroll ${ordersStyles.order_list}`}>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
            </ul>
        </div>
    )
}


export default Orders