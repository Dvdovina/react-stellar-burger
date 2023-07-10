import registerStyles from './register.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux'
import { register } from '../../../services/userSlice';
import { useForm } from '../../../hooks/useForm';



function Register() {

    const inputRef = useRef(null);

    const dispatch = useDispatch()

    const onSubmit = (payload) => {
        dispatch(register(payload))
    }

    const { values, handleChange } = useForm({ name: '', email: '', password: '', });

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(values)
    }


    return (
            <section className={registerStyles.section}>
                <form className={registerStyles.form} onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium">Регистрация</h2>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        placeholder={'Пароль'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!values.name || !values.email || !values.password}>Зарегистрироваться</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Уже зарегистрированы? <Link to="/login" className={registerStyles.link}>Войти</Link>
                </span>
            </section>
    )
}




export default Register;