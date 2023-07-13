import profileStyles from './profile.module.css'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../../services/userSlice';
import UserProfile from '../../userProfile/userProfile';
import Orders from '../../orders/orders';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";


function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {pathname} = useLocation()


 //Смена текста
    const changeText = () => {
        switch (pathname) {
            case '/profile':
              return (
                <>
                  В этом разделе вы можете
                  <br /> изменить свои персональные данные
                </>
              )
            case '/profile/orders':
              return (
                <>
                  В этом разделе вы можете
                  <br /> просмотреть свою историю заказов
                </>
              )
            default:
              return ''
          }
        }

    // Выход
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logOut())
        navigate("/login");
    };

    return (
        <section className={profileStyles.section}>
            <nav className={profileStyles.menu}>
                <NavLink
                    to={'/profile'}
                    className={({ isActive }) => isActive ? `${profileStyles.link} text text_type_main-medium ${profileStyles.link_active}` :
                        `${profileStyles.link} text text_type_main-medium text_color_inactive`}>
                    Профиль
                </NavLink>
                <NavLink
                    to={'/profile/orders'}
                    className={({ isActive }) => isActive ? `${profileStyles.link} text text_type_main-medium ${profileStyles.link_active}` :
                        `${profileStyles.link} text text_type_main-medium text_color_inactive`}>
                    История заказов
                </NavLink>
                <NavLink
                    to={'/logout'}
                    onClick={handleLogout}
                    className={({ isActive }) => isActive ? `${profileStyles.link} text text_type_main-medium ${profileStyles.link_active}` :
                        `${profileStyles.link} text text_type_main-medium text_color_inactive`}>
                    Выход
                </NavLink>
                <span className="text text_type_main-small text_color_inactive pt-20">
                    {changeText()}
                </span>
            </nav>
            <UserProfile/>
        </section>
    )
}


export default Profile;