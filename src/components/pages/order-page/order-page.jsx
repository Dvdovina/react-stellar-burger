import orderStyles from './order-page.module.css'
import OrderModal from '../../order-modal/order-modal'


function OrderPage() {

    return (
        <section className={orderStyles.section}>
            <OrderModal />
        </section>
    )
}


export default OrderPage