import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderAPIs } from "../../../apis/orderApi";

const initialState = {
  orders: [],
  errors: {},
};

export const actCreateNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (order) => {
    try {
      await OrderAPIs.createOrder(order);
    } catch (error) {}
  }
);
export const actFetchAllOrder = createAsyncThunk(
  "orders/actfetchAllOrder",
  async (params) => {
    const response = await OrderAPIs.getAllOders(params);
    return response;
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actFetchAllOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});
export const { _ } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;
