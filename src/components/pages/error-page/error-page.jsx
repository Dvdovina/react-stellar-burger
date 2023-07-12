import errorPageStyles from './error-page.module.css'
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";



function ErrorPage() {

    const navigate = useNavigate();

    const returnToMain = () => {
        navigate("/");
    };


    return (
            <section className={errorPageStyles.section}>
                <h2 className="text text_type_main-medium">Упс! Такой страницы не существует...</h2>
                <Button htmlType="button" type="primary" size="medium" onClick={returnToMain}>
                    Вернуться на главную?
                </Button>
            </section>
    )
}




export default ErrorPage;