import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import detailsStyles from './ingredient-details.module.css'


function IngredientDetails({ currentIngredient }) {

    return (
        <>



        </>
    )
}

IngredientDetails.propTypes = {
    currentIngredient: ingredientPropType.isRequired,
};

export default IngredientDetails