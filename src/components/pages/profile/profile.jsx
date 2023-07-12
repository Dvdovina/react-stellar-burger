import profileStyles from './profile.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../services/userSlice';
import { updateUser } from '../../../services/userSlice';
import { useNavigate } from "react-router-dom";


function Profile() {

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const { user } = useSelector(
        (store) => store.user,
    );

    const currentData = { ...user, password: '' }

    const [userInfo, setUserInfo] = useState(currentData)

    const [updatedInfo, setUpdatedInfo] = useState(false)



    const onInputChange = (event) => {
        const { name, value } = event.target
        setUserInfo({
            ...userInfo,
            [name]: value,
        })
        setUpdatedInfo(true)
    }

    //Обновить данные
    const onSubmit = (values) => {
        dispatch(updateUser(values))
        setUpdatedInfo(false)
    }

    const updateUserInfo = (e) => {
        e.preventDefault()
        onSubmit(userInfo)
    }

    //Сбросить изменения
    const handleReset = () => {
        setUserInfo(currentData)
        setUpdatedInfo(false)
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
                        В этом разделе вы можете<br /> изменить свои персональные данные
                    </span>
                </nav>
                <form className={profileStyles.form} onSubmit={updateUserInfo}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onInputChange}
                        value={userInfo.name}
                        name={'name'}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        icon="EditIcon"
                    />
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={onInputChange}
                        value={userInfo.email}
                        name={'email'}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        icon="EditIcon"
                    />
                    <PasswordInput
                        onChange={onInputChange}
                        value={userInfo.password}
                        name={'password'}
                        placeholder={'Пароль'}
                        icon="EditIcon"
                    />
                    {updatedInfo && (
                        <div className={profileStyles.buttons}>
                            <Button
                                onClick={handleReset}
                                htmlType="reset"
                                type="secondary"
                                size="medium"
                            >
                                Сбросить
                            </Button>
                            <Button
                                htmlType="submit"
                                type="secondary"
                                size="large">
                                Сохранить
                            </Button>
                        </div>
                    )}
                </form>
            </section>
    )
}




export default Profile;