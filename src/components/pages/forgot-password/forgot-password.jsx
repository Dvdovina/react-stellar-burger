import forgotPasswordStyles from './forgot-password.module.css'
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../../../services/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../../hooks/useForm';



function ForgotPassword() {

    const inputRef = useRef(null);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const { values, handleChange } = useForm({ email: '' });

    const onSubmit = (payload) => {
        dispatch(forgotPassword(payload))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(values.email)
        localStorage.setItem('email', values.email);
        navigate("/reset-password", { replace: true });
    }

    return (
            <section className={forgotPasswordStyles.section}>
                <form className={forgotPasswordStyles.form} onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium">Восстановление пароля</h2>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                    <Button htmlType="submit" type="primary" size="large" disabled={!values.email}>Восстановить</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive pt-20">
                    Вспомнили пароль? <Link to="/login" className={forgotPasswordStyles.link}>Войти</Link>
                </span>
            </section>
    )
}




export default ForgotPassword;