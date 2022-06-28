import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (limit) => {
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit}`
    );
    const result = response.json();
    return result;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
    status: false,
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      state.cart?.push(action.payload);
    },
    REMOVE_FROM_CART: (state, action) => {
      state.cart = state?.cart?.filter(
        (product) => product?.id !== action.payload
      );
    },
    REMOVE_ALL: (state, action) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = false;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = true;
    });
  },
});

export const { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL } =
  productsSlice.actions;
export default productsSlice.reducer;
