import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import Preloader from '../preloader/preloader';
import {  FC } from "react";
import { useAppSelector } from '../../hooks/useForm';
import { TProtectedRoute } from '../../utils/common-types';


export const Protected: FC<TProtectedRoute>  = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);
    const user = useAppSelector((state) => state.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Preloader />
    }


    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: TProtectedRoute) => (
    <Protected onlyUnAuth={true} component={component} />
);