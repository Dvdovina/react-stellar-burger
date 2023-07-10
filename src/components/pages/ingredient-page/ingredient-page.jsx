import IngredientDetails from '../../ingredient-details/ingredient-details';
import ingredientPageStyles from './ingredient-page.module.css'



function IngredientPage() {


    return (
        <>
            <section className={ingredientPageStyles.container}>
                <IngredientDetails />
            </section>
        </>
    )
}




export default IngredientPage; 