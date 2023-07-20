import orderProfileStyles from './order-profile-page.module.css'
import OrderModal from '../../order-modal/order-modal'
import { wsProfileConnect, wsProfileDisconnect } from '../../../services/actions/wsActions';
import { WS_PROFILE_URL } from '../../../utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router'


function OrderProfilePage() {

    const dispatch = useDispatch()
    const { id } = useParams();

    const accessToken = localStorage.getItem("accessToken");
    const accessTokenNoBearer = accessToken.slice(7);

    useEffect(() => {
        dispatch(wsProfileConnect(`${WS_PROFILE_URL}?token=${accessTokenNoBearer}`));
        return () => dispatch(wsProfileDisconnect(`${WS_PROFILE_URL}?token=${accessTokenNoBearer}`));
    }, []);

    const { orders } = useSelector(
        (store) => store.profileOrders,
    );

    const order = orders.find((order) => order._id === id);

    return (
        <section className={orderProfileStyles.section}>
            {order && (
                <OrderModal orders={orders} />
            )}
        </section>
    )
}


export default OrderProfilePage