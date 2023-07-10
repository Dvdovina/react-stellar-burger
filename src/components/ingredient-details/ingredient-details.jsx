import { ingredientPropType } from "../../utils/prop-types";
import detailsStyles from './ingredient-details.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


function IngredientDetails() {

    const dispatch = useDispatch();

    const { id } = useParams();

    const { currentIngredient } = useSelector((state) => state.currentIngredient);

    const { ingredients } = useSelector((store) => store.ingredients);

    return (
            <div className={detailsStyles.container}>
                <h2 className={`${detailsStyles.title} text text_type_main-large pb-5`}>Детали ингредиента</h2>
                <img src={currentIngredient.image_large} alt="Изображение ингредиента"></img>
                <span className="text text_type_main-medium pt-4">{currentIngredient.name}</span>
                <ul className={detailsStyles.nutrition}>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.calories}</p>
                    </li>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</p>
                    </li>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</p>
                    </li>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
    )
}


export default IngredientDetails