import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  status,
  signupStart,
  signupSuccess,
  signupFailure,
} from "./store/userReducer";

export const saveData = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const login = async (dispatch, info) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8800/api/users/login", info);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    dispatch(status());
    saveData(res.data);
  } catch (err) {
    console.log(err.response.data.message);
    // dispatch(loginFailure(err.response.data.message));
    dispatch(loginFailure(err.response.data.message));
  }
};

export const signup = async (dispatch, info) => {
  dispatch(signupStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/api/users/signup",
      info
    );
    dispatch(signupSuccess(res.data));
    dispatch(status());
    saveData(res.data);
  } catch (err) {
    console.log(err.response.data.message);
    // dispatch(loginFailure(err.response.data.message));
    dispatch(signupFailure(err.response.data.message));
  }
};
