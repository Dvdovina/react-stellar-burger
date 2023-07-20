import orderStyles from './order-page.module.css'
import OrderModal from '../../order-modal/order-modal'
import { wsConnect, wsDisconnect } from '../../../services/actions/wsActions'
import { WS_FEED_URL } from '../../../utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useMatch } from 'react-router'


function OrderPage() {

    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        dispatch(wsConnect(WS_FEED_URL));
        return () => dispatch(wsDisconnect());
    }, []);

    const { orders } = useSelector(
        (store) => store.feed,
    );

    const order = orders.find((order) => order._id === id);

    return (
        <section className={orderStyles.section}>
            {order && (
                <OrderModal orders={orders} />
            )}
        </section>
    )
}


export default OrderPage