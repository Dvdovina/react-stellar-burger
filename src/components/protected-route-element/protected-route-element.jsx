import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";


function Protected({ children, onlyUnAuth = false, }) {


    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };


    const { isAuth } = useSelector(
        (store) => store.user,)

    if (onlyUnAuth && isAuth) {
        return <Navigate to={from} />
    }

    if (!onlyUnAuth && !isAuth) {
        return <Navigate to={'/login'} state={{ from: location }} />
    }

    return children
}

export default Protected
