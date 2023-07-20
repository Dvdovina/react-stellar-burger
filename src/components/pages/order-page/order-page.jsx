import orderStyles from './order-page.module.css'
import OrderModal from '../../order-modal/order-modal'
import { wsConnect, wsDisconnect } from '../../../services/actions/wsActions'
import { WS_FEED_URL } from '../../../utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function OrderPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(wsConnect(WS_FEED_URL));
        return () => dispatch(wsDisconnect());
    }, []);

    const { orders } = useSelector(
        (store) => store.feed,
    );

    return (
        <section className={orderStyles.section}>
            <OrderModal orders={orders}/>
        </section>
    )
}


export default OrderPage