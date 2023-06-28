import loginStyles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../services/userSlice';




function Login() {


    const inputRef = useRef(null);

    const dispatch = useDispatch()

    const onSubmit = (payload) => {
        dispatch(loginUser(payload))
    }

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
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
        <section className={loginStyles.section}>
            <form className={loginStyles.form} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium">Вход</h2>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onInputChange}
                    value={userInfo.email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                />
                <PasswordInput
                    onChange={onInputChange}
                    value={userInfo.password}
                    name={'password'}
                    placeholder={'Пароль'}
                />
                <Button htmlType="submit" type="primary" size="large" disabled={!userInfo.email || !userInfo.password}>Войти</Button>
            </form>
            <span className="text text_type_main-default text_color_inactive pt-20">
                Вы - новый пользователь? <Link to="/register" className={loginStyles.link}>Зарегистрироваться</Link>
            </span>
            <span className="text text_type_main-default text_color_inactive pt-4">
                Забыли пароль? <Link to="/forgot-password" className={loginStyles.link}>Восстановить пароль</Link>
            </span>
        </section>
    )
}




export default Login;