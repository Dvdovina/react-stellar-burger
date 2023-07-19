import ordersPageStyles from './orders-page.module.css'
import Orders from '../../orders/orders'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../../services/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { WS_PROFILE_URL } from '../../../utils/api';


function OrdersPage() {



    const dispatch = useDispatch()
    const navigate = useNavigate();

    // Выход
    const handleLogout = (e) => {
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
            <Orders />
        </section>
    )
}

export default OrdersPage