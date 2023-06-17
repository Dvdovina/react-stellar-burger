import forgotPasswordStyles from './forgot-password.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';


function ForgotPassword() {

    const [email, setEmail] = useState('');
    const inputRef = useRef(null);


    return (
        <>
            <section className={forgotPasswordStyles.section}>
                <form className={forgotPasswordStyles.form}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!email}>Восстановить</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Вспомнили пароль? <Link to="/login" className={forgotPasswordStyles.link}>Войти</Link>
                </span>
            </section>
        </>
    )
}




export default ForgotPassword;