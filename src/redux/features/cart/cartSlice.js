import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const cartItems =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalPrice =
  localStorage.getItem("totalPrice") !== null
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const setItemFunc = (cartItems, totalPrice, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: [...cartItems],
  totalQuantity: totalQuantity,
  totalPrice: totalPrice,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productById = action?.payload;

      const existProductById = state?.cartItems?.find(
        (product) =>
          product?.id === productById?.id &&
          product?.size === productById?.size &&
          product?.color === productById?.color
      );
      if (existProductById) {
        existProductById.quantity++;
        existProductById.totalPrice += productById?.price;
        state.totalQuantity++;
        state.totalPrice += productById?.price;
      } else {
        state.cartItems = [
          ...state.cartItems,
          {
            id: productById?.id,
            title: productById?.title,
            price: productById?.price,
            product_type: productById?.product_type,
            size: productById?.size,
            color: productById?.color,
            quantity: 1,
            images: productById?.images?.image,
            totalPrice: productById?.price,
          },
        ];
        state.totalQuantity++;
        state.totalPrice += productById?.price;
      }
      setItemFunc(
        state.cartItems.map((products) => products),
        state.totalPrice,
        state.totalQuantity
      );
      message.success(
        <strong className="text-success mt-5">
          "Thêm 1 sản phẩm vào giỏ hàng thành công__Mến chúc quý khách mua sắm
          vui vẻ !!!"
        </strong>
      );
    },
    decreaseItemQuantity: (state, action) => {
      const productById = action.payload;

      const existProductById = state.cartItems.find(
        (product) =>
          product.id === productById.id &&
          product.size === productById.size &&
          product.color === productById.color
      );
      if (existProductById.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (product) =>
            product.id !== productById.id ||
            product.size !== productById.size ||
            product.color !== productById.color
        );
        state.totalQuantity--;
        state.totalPrice -= productById.price;
      } else {
        existProductById.quantity--;
        existProductById.totalPrice -= productById.price;
        state.totalQuantity--;
        state.totalPrice -= productById.price;
      }
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalPrice,
        state.totalQuantity
      );
      message.success(
        <strong className="text-danger mt-5">
          "Đã xóa 1 sản phẩm ra khỏi giỏ hàng thành công__Mến chúc quý khách mua
          sắm vui vẻ !!!"
        </strong>
      );
    },
    increaseItemQuantity: (state, action) => {
      const productById = action.payload;

      const existProductById = state.cartItems.find(
        (product) =>
          product.id === productById.id &&
          product.size === productById.size &&
          product.color === productById.color
      );
      if (existProductById.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (product) =>
            product.id !== productById.id ||
            product.size !== productById.size ||
            product.color !== productById.color
        );
        state.totalQuantity++;
        state.totalPrice += productById.price;
      } else {
        existProductById.quantity++;
        existProductById.totalPrice += productById.price;
        state.totalQuantity++;
        state.totalPrice += productById.price;
      }
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalPrice,
        state.totalQuantity
      );
      message.success(
        <strong className="text-success mt-5">
          "Thêm 1 sản phẩm vào giỏ hàng thành công__Mến chúc quý khách mua sắm
          vui vẻ !!!"
        </strong>
      );
    },
    deleteItem: (state, action) => {
      const { id, color, size } = action.payload;

      const existProductById = state.cartItems.find(
        (product) =>
          product.id === id && product.color === color && product.size === size
      );

      if (existProductById) {
        state.cartItems = state.cartItems.filter(
          (product) =>
            product.id !== id ||
            product.color !== color ||
            product.size !== size
        );
        state.totalQuantity = state.totalQuantity - existProductById.quantity;
      }

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((products) => products),
        state.totalPrice,
        state.totalQuantity
      );
      message.success(
        <strong className="text-danger mt-5">
          "Đã xóa sản phẩm khỏi giỏ hàng thành công__Mến chúc quý khách mua sắm
          vui vẻ !!!"
        </strong>
      );
    },
    clearAllCarts: (state, _) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      setItemFunc(
        state.cartItems.map((products) => products),
        state.totalPrice,
        state.totalQuantity
      );
      message.success(
        <strong className="text-danger mt-5">
          "Đã xóa toàn bộ sản phẩm ra khỏi giỏ hàng thành công__Mến chúc quý
          khách mua sắm vui vẻ !!!"
        </strong>
      );
    },
  },
});

export const {
  addToCart,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearAllCarts,
} = cartSlice.actions;
export const cartsReducer = cartSlice.reducer;
