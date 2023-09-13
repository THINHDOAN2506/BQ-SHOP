import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductAPIs } from "../../../apis/productApi";

const initialState = {
  isLoading: false,
  errors: {},
  products: [],
  currentProduct: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
    total: 0,
  },
  searchKey: "",
  params: {
    _sort: null,
    _order: null,
    price_lte: null,
    price_gte: null,
    sale_lte: null,
    sale_gte: null,
    size_like: null,
  },
};

export const actfetchAllProduct = createAsyncThunk(
  "products/actfetchAllProduct",
  async (params = {}) => {
    const response = await ProductAPIs.getAllProducts(params);
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);

export const actFetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const product = await ProductAPIs.getProductById(productId);
    return product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    fiterReducer: (state, action) => {
      if (action.payload === "Tên Từ A-Z" || action.payload === "Tên Từ Z-A") {
        state.params._sort = "title";
        state.params._order = action.payload === "Tên Từ A-Z" ? "asc" : "desc";
      }
      if (
        action.payload === "Giá: Tăng Dần" ||
        action.payload === "Giá: Giảm Dần"
      ) {
        state.params._sort = "price";
        state.params._order =
          action.payload === "Giá: Tăng Dần" ? "asc" : "desc";
      }

      if (action.payload === "Mới Nhất" || action.payload === "Cũ Nhất") {
        state.params._sort = "createAt";
        state.params._order = action.payload === "Mới Nhất" ? "desc" : "asc";
      }

      if (action.payload === "Sản Phẩm Nổi Bật") {
        state.params.sale_gte = 20;
      }

      if (action.payload === "Dưới 300.000đ") {
        state.params.price_lte = 300000;
        state.params.price_gte = 0;
      }
      if (action.payload === "300.000đ - 700.000đ") {
        state.params.price_gte = 300000;
        state.params.price_lte = 700000;
      }
      if (action.payload === "700.000đ - 1.000.000đ") {
        state.params.price_gte = 700000;
        state.params.price_lte = 1000000;
      }
      if (action.payload === "1.000.000đ - 2.000.000đ") {
        state.params.price_gte = 1000000;
        state.params.price_lte = 2000000;
      }
      if (action.payload === "Trên 2.000.000") {
        state.params.price_gte = 2000000;
        state.params.price_lte = 9000000000000000;
      }

      if (action.payload === "Dưới 25%") {
        state.params.sale_lte = 24.999;
        state.params.sale_gte = 0.001;
      }
      if (action.payload === "25%-50%") {
        state.params.sale_lte = 49.999;
        state.params.sale_gte = 25;
      }
      if (action.payload === "50%-75%") {
        state.params.sale_lte = 74.999;
        state.params.sale_gte = 50;
      }
      if (action.payload === "75%-100%") {
        state.params.sale_lte = 100;
        state.params.sale_gte = 75;
      }
      if (action.payload.type === "size") {
        state.params.size_like = action.payload.value;
      }
    },
    filterProductBySize: (state, action) => {
      state.products = state?.products?.filter((product) =>
        product?.size?.includes(action.payload)
      );
    },
    deleteFilterReducer: (state, _) => {
      state.params = {
        _sort: null,
        _order: null,
        price_lte: null,
        price_gte: null,
        sale_lte: null,
        sale_gte: null,
        size_like: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actfetchAllProduct.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(actfetchAllProduct.rejected, (state, _) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actfetchAllProduct.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.pagination.total = action.payload.total;
      state.isLoading = false;
    });
    builder.addCase(actFetchProductById.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
    });
  },
});
export const {
  setLoading,
  setNewPage,
  setSearchKey,
  fiterReducer,
  deleteFilterReducer,
  filterProductBySize,
} = productSlice.actions;
export const productsReducer = productSlice.reducer;
