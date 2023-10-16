import ordersPageStyles from './orders-page.module.css'
import Orders from '../../orders/orders'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../../services/userSlice';
import { useNavigate } from "react-router-dom";
import { WS_PROFILE_URL } from '../../../utils/api';
import { wsProfileConnect, wsProfileDisconnect } from '../../../services/actions/wsActions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useForm'


function OrdersPage() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const accessToken = localStorage.getItem("accessToken");
    const accessTokenNoBearer = accessToken?.slice(7);

    useEffect(() => {
        dispatch(wsProfileConnect(`${WS_PROFILE_URL}?token=${accessTokenNoBearer}`));
        return () => { dispatch(wsProfileDisconnect(`${WS_PROFILE_URL}?token=${accessTokenNoBearer}`)) };
    }, []);

    const { orders } = useAppSelector(
        (store) => store.profileOrders,
    );

    // Выход
    const handleLogout = (e: any) => {
        e.preventDefault()
        dispatch(logOut())
        navigate("/login");
    };

    return (
        <section className={ordersPageStyles.section}>
            <nav className={ordersPageStyles.menu}>
                <NavLink
                    to={'/profile'}
                    className={`${ordersPageStyles.link} text text_type_main-medium text_color_inactive`}>
                    Профиль
                </NavLink>
                <NavLink
                    to={'/profile/orders'}
                    className={({ isActive }) => isActive ? `${ordersPageStyles.link} text text_type_main-medium ${ordersPageStyles.link_active}` :
                        `${ordersPageStyles.link} text text_type_main-medium text_color_inactive`}>
                    История заказов
                </NavLink>
                <NavLink
                    to={'/logout'}
                    onClick={handleLogout}
                    className={({ isActive }) => isActive ? `${ordersPageStyles.link} text text_type_main-medium ${ordersPageStyles.link_active}` :
                        `${ordersPageStyles.link} text text_type_main-medium text_color_inactive`}>
                    Выход
                </NavLink>
                <span className="text text_type_main-small text_color_inactive pt-20">
                    В этом разделе вы можете
                    <br /> просмотреть свою историю заказов
                </span>
            </nav>
            <Orders orders={orders} />
        </section>
    )
}

export default OrdersPage