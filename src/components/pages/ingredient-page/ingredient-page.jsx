import IngredientDetails from '../../ingredient-details/ingredient-details';
import ingredientPageStyles from './ingredient-page.module.css'



function IngredientPage({ currentIngredient }) {


    return (
        <>
            <section className={ingredientPageStyles.container}>
                <IngredientDetails currentIngredient={currentIngredient} />
            </section>
        </>
    )
}




export default IngredientPage; 