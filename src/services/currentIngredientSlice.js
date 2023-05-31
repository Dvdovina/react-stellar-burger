import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ingredient: null
};

const currentIngredientSlice = createSlice({
    name: 'currentIngredient',
    initialState,
    reducers: {
        showIngredient: (state, action) => {
            state.ingredient = action.payload
        },
        hideIngredient: () => {
            return initialState
        }
    },
})

export const { showIngredient, hideIngredient } = currentIngredientSlice.actions
export default currentIngredientSlice.reducer;