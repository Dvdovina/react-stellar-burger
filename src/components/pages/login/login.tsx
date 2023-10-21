import loginStyles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, FormEvent } from 'react';
import { Link } from "react-router-dom";
import { login } from '../../../services/userSlice';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../../hooks/useForm';
import { TUserLogin } from '../../../utils/api-types';
import { useAppDispatch } from '../../../hooks/useForm';



function Login() {

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const { values, handleChange } = useForm({ email: '', password: '', });

    const onSubmit = (payload: TUserLogin) => {
        dispatch(login(payload))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(values)
        navigate("/", { replace: true });
    }

    return (
        <section className={loginStyles.section}>
            <form className={loginStyles.form} onSubmit={handleSubmit}>
                <h2 className="text text_type_main-medium">Вход</h2>
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
                <Button htmlType="submit" type="primary" size="large" disabled={!values.email || !values.password}>Войти</Button>
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