import registerStyles from './register.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux'
import { register } from '../../../services/userSlice';



function Register() {

    const inputRef = useRef(null);

    const dispatch = useDispatch()

    const onSubmit = (payload) => {
        dispatch(register(payload))
    }

    const [userInfo, setUserInfo] = useState({
        name: '',
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
            <section className={registerStyles.section}>
                <form className={registerStyles.form} onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium">Регистрация</h2>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onInputChange}
                        value={userInfo.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
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
                    <Button htmlType="submit" type="primary" size="large" disabled={!userInfo.name || !userInfo.email || !userInfo.password}>Зарегистрироваться</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Уже зарегистрированы? <Link to="/login" className={registerStyles.link}>Войти</Link>
                </span>
            </section>
    )
}




export default Register;