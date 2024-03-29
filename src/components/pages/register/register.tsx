import registerStyles from './register.module.css'
import { Link } from "react-router-dom";
import { useRef, FormEvent } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../hooks/useForm';
import { register } from '../../../services/userSlice';
import { useForm } from '../../../hooks/useForm';
import { TUser } from '../../../utils/api-types';
import { useNavigate } from "react-router-dom";



function Register() {

    const inputRef = useRef(null);

    const dispatch = useAppDispatch()

    const onSubmit = (payload: TUser) => {
        dispatch(register(payload))
    }
    const navigate = useNavigate();

    const { values, handleChange } = useForm({ name: '', email: '', password: '', });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(values)
        navigate("/login", { replace: true });
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