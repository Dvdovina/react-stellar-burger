import resetPasswordStyles from './reset-password.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../../services/userSlice';
import { useDispatch } from 'react-redux';



function ResetPassword() {

    const inputRef = useRef(null);

    const dispatch = useDispatch()

    const onSubmit = (payload) => {
        dispatch(resetPassword(payload))
    }

    const [userInfo, setUserInfo] = useState({
        password: '',
        token: '',
    })

    const onInputChange = (event) => {
        const { name, value } = event.target
        setUserInfo({
            ...userInfo,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(userInfo)
    }

    return (
        <>
            <section className={resetPasswordStyles.section}>
                <form className={resetPasswordStyles.form} onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <PasswordInput
                        onChange={onInputChange}
                        value={userInfo.password}
                        name={'password'}
                        placeholder={'Введите новый пароль'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onInputChange}
                        value={userInfo.token}
                        name={'token'}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!userInfo.password || !userInfo.token}>Сохранить</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Вспомнили пароль? <Link to="/login" className={resetPasswordStyles.link}>Войти</Link>
                </span>
            </section>
        </>
    )
}




export default ResetPassword;