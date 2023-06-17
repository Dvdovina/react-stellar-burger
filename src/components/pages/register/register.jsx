import registerStyles from './register.module.css'
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';



function Register() {

    const inputRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <section className={registerStyles.section}>
                <form className={registerStyles.form}>
                    <h2 className="text text_type_main-medium">Регистрация</h2>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        placeholder={'Пароль'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!name || !email || !password}>Зарегистрироваться</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Уже зарегистрированы? <Link to="/login" className={registerStyles.link}>Войти</Link>
                </span>
            </section>
        </>
    )
}




export default Register;