import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postOrder } from '../utils/api';
import { TRequest } from '../utils/common-types';


export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (item: (string | undefined)[], thunkApi) => {
    try {
      return await postOrder(item)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);


export type TOrderState = {
  orderNumber: number | null;
  orderFetchStatus: TRequest | boolean;
  orderError: string | boolean;
  isOpen: boolean;
};


const initialState: TOrderState = {
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