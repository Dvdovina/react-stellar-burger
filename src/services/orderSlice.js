import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postOrder } from '../utils/api';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async function (idIngredients, thunkAPI) {
    try {
      const data = await postOrder(idIngredients);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
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
    showOrderModal: (state, action) => {
      state.isOpen = true
      state.orderNumber = action.payload
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
        state.orderNumber = action.payload;
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
export const { showOrderModal, hideOrderModal } = orderSlice.actions