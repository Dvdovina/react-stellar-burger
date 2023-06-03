import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postOrder } from '../utils/api';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (payload) => {
    const data = await postOrder(payload);
    return data;
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
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = true;
      });
  }
})


export default orderSlice.reducer;
export const {showOrderModal, hideOrderModal} = orderSlice.actions