import detailsStyles from './ingredient-details.module.css';
import { useSelector} from "react-redux";
import { useParams } from "react-router-dom";



function IngredientDetails() {

    const { id } = useParams();

    const { currentIngredient } = useSelector((state) => state.currentIngredient);

    const { ingredients } = useSelector((state) => state.ingredients)
    if (!ingredients.length) return null
    
    const { proteins, fat, carbohydrates, calories, name, image_large } =
    ingredients.find(({ _id }) => _id === id)

    return (
            <div className={detailsStyles.container}>
                <h2 className={`${detailsStyles.title} text text_type_main-large pb-5`}>Детали ингредиента</h2>
                <img src={image_large} alt="Изображение ингредиента"></img>
                <span className="text text_type_main-medium pt-4">{name}</span>
                <ul className={detailsStyles.nutrition}>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{calories}</p>
                    </li>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
                    </li>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{fat}</p>
                    </li>
                    <li className={detailsStyles.content}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                    </li>
                </ul>
            </div>
    )
}


export default IngredientDetails