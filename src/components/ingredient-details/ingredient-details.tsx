import detailsStyles from './ingredient-details.module.css';
import { useParams } from "react-router-dom";
import { useAppSelector } from '../../hooks/useForm';
import { TIngredient } from '../../utils/common-types';

interface Params {
    id: string;
}

function IngredientDetails() {

    const { id } = useParams<keyof Params>() as Params;

    const { ingredients } = useAppSelector((state) => state.ingredients)
    if (!ingredients.length) return null

    const { proteins, fat, carbohydrates, calories, name, image_large } =
        ingredients?.find(({ _id }) => _id === id) as TIngredient

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