import { configureStore } from "@reduxjs/toolkit";
import { cartsReducer } from "../features/cart/cartSlice";
import { productsReducer } from "../features/products/productSlice";
import authReducer from "../../redux/features/products/authSlice";
import { ordersReducer } from "../features/products/orderSlice";
import { commentsReducer } from "../features/products/commentSlice";

export const store = configureStore({
  reducer: {
    cart: cartsReducer,
    product: productsReducer,
    auth: authReducer,
    order: ordersReducer,
    comment: commentsReducer,
  },
});
