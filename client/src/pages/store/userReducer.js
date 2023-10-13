import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    error: null,
    isLoading: false,
    status: false,
    user: null,
    errorStatus: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.errorStatus = true;
    },
    status: (state) => {
      state.status = true;
    },
    signupStart: (state) => {
      state.isLoading = true;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.errorStatus = true;
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  signupStart,
  signupFailure,
  signupSuccess,
  status,
} = userReducer.actions;

export default userReducer.reducer;
