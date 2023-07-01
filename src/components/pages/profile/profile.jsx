import profileStyles from './profile.module.css'
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../services/userSlice';


function Profile() {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logOut(payload));
    };


    const { user } = useSelector(
        (store) => store.user);


    const inputRef = useRef(null);



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
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
                        В этом разделе вы можете<br /> изменить свои персональные данные
                    </span>
                </nav>
                <form className={profileStyles.form}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        icon="EditIcon"
                    />
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        icon="EditIcon"
                    />
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        placeholder={'Пароль'}
                        icon="EditIcon"
                    />
                </form>
            </section>
        </>
    )
}




export default Profile;