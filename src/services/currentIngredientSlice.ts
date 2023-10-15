import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentIngredient: null,
    isOpen: false
};

const currentIngredientSlice = createSlice({
    name: 'currentIngredient',
    initialState,
    reducers: {
        showIngredient: (state, action) => {
            state.isOpen = true;
            state.currentIngredient = action.payload
        },
        hideIngredient: (state) => {
            state.currentIngredient = null
            state.isOpen = false
        }
    },
})

export const { showIngredient, hideIngredient } = currentIngredientSlice.actions
export default currentIngredientSlice.reducer;