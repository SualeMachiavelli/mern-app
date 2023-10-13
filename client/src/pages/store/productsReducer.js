import { createSlice } from "@reduxjs/toolkit";

const productsReducer = createSlice({
  name: "product",
  initialState: {
    products: [],
    fetching: false,
    error: null,
    errorStatus: false,
    status: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.fetching = true;
    },
    status: (state) => {
      state.status = true;
    },
    fetchSuccess: (state, action) => {
      state.fetching = false;
      state.products = action.payload;
    },
    fetchFailure: (state, action) => {
      state.fetching = false;
      state.error = action.payload;
      state.errorStatus = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, status } =
  productsReducer.actions;

export default productsReducer.reducer;
