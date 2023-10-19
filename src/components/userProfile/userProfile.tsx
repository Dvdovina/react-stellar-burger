import userProfileStyles from './userProfile.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { updateUser } from '../../services/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useForm';
import { MouseEvent } from 'react';

function UserProfile() {

    const inputRef = useRef(null);

    const dispatch = useAppDispatch()

    const user = useAppSelector(
        (store) => store.user.user,
    );

    const currentData = { ...user, password: '' }

    const [userInfo, setUserInfo] = useState(currentData)

    const [updatedInfo, setUpdatedInfo] = useState(false)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUserInfo({
            ...userInfo,
            [name]: value,
        })
        setUpdatedInfo(true)
    }

    //Обновить данные
    const onSubmit = (values: any) => {
        dispatch(updateUser(values))
        setUpdatedInfo(false)
    }

    const updateUserInfo = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(userInfo)
    }

    //Сбросить изменения
    const handleReset = () => {
        setUserInfo(currentData)
        setUpdatedInfo(false)
    }

    return (
        <form className={userProfileStyles.form} onSubmit={updateUserInfo}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onInputChange}
                value={userInfo.name}
                name={'name'}
                ref={inputRef}
                errorText={'Ошибка'}
                icon="EditIcon"
            />
            <Input
                type={'email'}
                placeholder={'Логин'}
                onChange={onInputChange}
                value={userInfo.email}
                name={'email'}
                ref={inputRef}
                errorText={'Ошибка'}
                icon="EditIcon"
            />
            <PasswordInput
                onChange={onInputChange}
                value={userInfo.password}
                name={'password'}
                placeholder={'Пароль'}
                icon="EditIcon"
            />
            {updatedInfo && (
                <div className={userProfileStyles.buttons}>
                    <Button
                        onClick={handleReset}
                        htmlType="reset"
                        type="secondary"
                        size="medium"
                    >
                        Сбросить
                    </Button>
                    <Button
                        htmlType="submit"
                        type="secondary"
                        size="large">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    )
}

export default UserProfile