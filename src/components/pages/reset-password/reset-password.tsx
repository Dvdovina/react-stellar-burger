import resetPasswordStyles from './reset-password.module.css'
import { Link } from "react-router-dom";
import { useRef, FormEvent } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../../services/userSlice';
import { useAppDispatch } from '../../../hooks/useForm';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../../hooks/useForm';
import { Navigate } from "react-router-dom";
import { TPasswordReset } from '../../../utils/api-types';


function ResetPassword() {

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const { values, handleChange } = useForm({ password: '', token: '' });

    const onSubmit = (payload: TPasswordReset) => {
        dispatch(resetPassword(payload))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(values)
        navigate("/login", { replace: true });
    }

    if (!localStorage.getItem('email')) {
        return <Navigate to={'/forgot-password'} replace={true} />;
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