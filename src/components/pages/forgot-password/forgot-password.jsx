import forgotPasswordStyles from './forgot-password.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../../../services/userSlice';
import { useDispatch } from 'react-redux';


function ForgotPassword() {

    const inputRef = useRef(null);

    const onSubmit = (payload) => {
        dispatch(forgotPassword(payload))
    }

    const [userInfo, setUserInfo] = useState({
        email: '',
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
            <section className={forgotPasswordStyles.section}>
                <form className={forgotPasswordStyles.form} onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={onInputChange}
                        value={userInfo.email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!userInfo.email}>Восстановить</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Вспомнили пароль? <Link to="/login" className={forgotPasswordStyles.link}>Войти</Link>
                </span>
            </section>
        </>
    )
}




export default ForgotPassword;