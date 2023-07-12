import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './app-header.module.css';
import { NavLink, useMatch, Link } from "react-router-dom";


function AppHeader() {

    const home = useMatch('/');
    const list = useMatch('/profile/orders');
    const profile = useMatch('/profile');

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <nav className={headerStyles.navigation}>
                <ul className={headerStyles.list}>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5 pr-5`}>
                        <NavLink end to={'/'}
                            className={({ isActive }) => isActive ? `${headerStyles.link} text text_type_main-default ${headerStyles.link_active}` :
                                `${headerStyles.link} text text_type_main-default text_color_inactive`}>
                            <BurgerIcon type={home ? "primary" : "secondary"} />
                            Конструктор
                        </NavLink>
                    </li>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5`}>
                        <NavLink end to={'/feed'}
                            className={({ isActive }) => isActive ? `${headerStyles.link} text text_type_main-default ${headerStyles.link_active}` :
                                `${headerStyles.link} text text_type_main-default text_color_inactive`}>
                            <ListIcon type={list ? "primary" : "secondary"} />
                            Лента заказов
                        </NavLink>
                    </li>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5 pr-5`}>
                        <NavLink end to={'/profile'}
                            className={({ isActive }) => isActive ? `${headerStyles.link} text text_type_main-default ${headerStyles.link_active}` :
                                `${headerStyles.link} text text_type_main-default text_color_inactive`}>
                            <ProfileIcon type={profile ? "primary" : "secondary"} />
                            Личный кабинет
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

export default AppHeader
