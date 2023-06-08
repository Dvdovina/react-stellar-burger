import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postOrder } from '../utils/api';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (order, thunkApi) => {
    try {
      const ingredientsId = order.ingredients.map(item => item._id);
      const bunId = order.bun._id;
      const allFoodIds = [bunId, ...ingredientsId, bunId];
      return await postOrder({ ingredients: allFoodIds })
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const initialState = {
  orderNumber: null,
  orderFetchStatus: false,
  orderError: false,
  isOpen: false
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    hideOrderModal: (state) => {
      state.isOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.orderFetchStatus = true;
        state.orderError = false
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number.toString();
        state.orderFetchStatus = false;
        state.isOpen = true
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.orderFetchStatus = false;
        state.orderError = true;
        console.error(action.payload);
        state.orderNumber = null
      });
  },
});

export default orderSlice.reducer;
export const { hideOrderModal } = orderSlice.actions