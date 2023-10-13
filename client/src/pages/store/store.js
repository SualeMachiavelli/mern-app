import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productsReducers from "./productsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productsReducers,
  },
});

export default store;
