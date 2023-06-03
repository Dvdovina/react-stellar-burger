import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postOrder } from '../utils/api';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (payload) => {
    const idBun = payload.bun._id;
    const ingredientsArr = payload.ingredients.map(item => item._id);
    const allIds = [idBun, ...ingredientsArr, idBun]
    return await postOrder({ingredients: allIds});
  }
);

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderError: false,
  isOpen: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    showOrderModal: (state) => {
      state.isOpen = true;
    },
    hideOrderModal: (state) => {
      state.isOpen = false
      state.orderNumber = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.orderRequest = true
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number.toString();
        state.orderRequest = false;
        state.isOpen = true;
      })
      .addCase(submitOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderError = true;
      });
  }
})


export default orderSlice.reducer;
export const {showOrderModal, hideOrderModal} = orderSlice.actions