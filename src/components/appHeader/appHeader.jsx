import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './appHeader.module.css';


function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>
                <Logo />
            </div>
            <nav className={headerStyles.navigation}>
                <ul className={headerStyles.list}>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5`}>
                        <BurgerIcon />
                        <p className="text text_type_main-default">Конструктор</p>     
                    </li>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5`}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive">Лента заказов</p>     
                    </li>
                    <li className={`${headerStyles.item} pb-4 pt-4 pl-5 pr-5`}>
                        <ProfileIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>     
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader
