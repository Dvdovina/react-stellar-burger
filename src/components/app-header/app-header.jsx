import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './app-header.module.css';


function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>
                <Logo />
            </div>
            <nav className={headerStyles.navigation}>
                <ul className={headerStyles.list}>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5 pr-5`}>
                        <a href="#" className={headerStyles.link}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">Конструктор</p>
                        </a>
                    </li>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5`}>
                        <a href="#" className={headerStyles.link}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                        </a>
                    </li>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5 pr-5`}>
                        <a href="#" className={headerStyles.link}>
                            <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

export default AppHeader
