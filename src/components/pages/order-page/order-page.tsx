import orderStyles from './order-page.module.css'
import OrderModal from '../../order-modal/order-modal'
import { wsConnect, wsDisconnect } from '../../../services/actions/wsActions'
import { WS_FEED_URL } from '../../../utils/api'
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../hooks/useForm'
import { TOrder } from '../../../utils/common-types';


function OrderPage() {

    const dispatch = useAppDispatch()
    const { id } = useParams();

    useEffect(() => {
        dispatch(wsConnect(WS_FEED_URL));
        return () => { dispatch(wsDisconnect()) };
    }, []);

    const { orders } = useAppSelector(
        (store) => store.feed,
    );

    const order = orders.find((order: TOrder) => order._id === id);

    return (
        <section className={orderStyles.section}>
            {order && (
                <OrderModal orders={orders} />
            )}
        </section>
    )
}


export default OrderPage