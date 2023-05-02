import { ingredientPropType } from "../../utils/prop-types";
import ingredientsStyles from "./burger-ingredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
    return (
        <>
            <section className={ingredientsStyles.section}>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={ingredientsStyles.tab}>



                </div>
                <div className={ingredientsStyles.ingredients_box}>
                    <h2 className="text text_type_main-medium">Булки</h2>



                </div>







            </section>
        </>
    )
}

export default BurgerIngredients