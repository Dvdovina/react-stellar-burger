import resetPasswordStyles from './reset-password.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';



function ResetPassword() {

    const [password, setPassword] = useState('');

    const [securityCode, setSecurityCode] = useState('');
    const inputRef = useRef(null);



    return (
        <>
            <section className={resetPasswordStyles.section}>
                <form className={resetPasswordStyles.form}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        placeholder={'Введите новый пароль'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setSecurityCode(e.target.value)}
                        value={securityCode}
                        name={'securityCode'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!securityCode || !password}>Сохранить</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Вспомнили пароль? <Link to="/login" className={resetPasswordStyles.link}>Войти</Link>
                </span>
            </section>
        </>
    )
}




export default ResetPassword;