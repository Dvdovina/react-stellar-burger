import profileStyles from './profile.module.css'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../../services/userSlice';
import UserProfile from '../../userProfile/userProfile';
import { useAppDispatch } from '../../../hooks/useForm';
import { useNavigate } from "react-router-dom";


function Profile() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    // Выход
    const handleLogout = (e: any) => {
        e.preventDefault()
        dispatch(logOut())
        navigate("/login");
    };

    return (
        <section className={profileStyles.section}>
            <nav className={profileStyles.menu}>
                <NavLink
                    to={'/profile'}
                    className={`${profileStyles.link} text text_type_main-medium ${profileStyles.link_active}`}>
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
                    В этом разделе вы можете
                    <br /> изменить свои персональные данные
                </span>
            </nav>
            <UserProfile />
        </section>
    )
}


export default Profile;