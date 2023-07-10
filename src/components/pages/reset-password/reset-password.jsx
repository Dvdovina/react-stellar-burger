import resetPasswordStyles from './reset-password.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../../services/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../../hooks/useForm';



function ResetPassword() {

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const { values, handleChange } = useForm({ password: '', token: '' });

    const onSubmit = (payload) => {
        dispatch(resetPassword(payload))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(values)
        navigate("/login", { replace: true });
    }

    return (
            <section className={resetPasswordStyles.section}>
                <form className={resetPasswordStyles.form} onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        placeholder={'Введите новый пароль'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={values.token}
                        name={'token'}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!values.password || !values.token}>Сохранить</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Вспомнили пароль? <Link to="/login" className={resetPasswordStyles.link}>Войти</Link>
                </span>
            </section>
    )
}




export default ResetPassword;