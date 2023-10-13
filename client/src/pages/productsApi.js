import axios from "axios";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  status,
} from "./store/productsReducer";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user"))?.token;

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    encType: "multipart/form-data",
    token: "Bearer " + token,
  },
};

const configData = {
  headers: {
    "Content-Type": "application/json",

    token: "Bearer " + token,
  },
};

const input = ["flower", "card"];
const type = Math.floor(Math.random() * 2 + 1) - 1;

export const uploadFlower = async (dispatch, info) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.post(
      "http://localhost:8800/api/flowers",
      info,
      config
    );
    dispatch(fetchSuccess(data));
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
    console.log(err.response.data.message);
  }
};

export const uploadGiftCard = async (dispatch, info) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.post(
      "http://localhost:8800/api/cards",
      info,
      config
    );
    dispatch(fetchSuccess(data));
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
    console.log(err.response.data.message);
  }
};

export const uploadReview = async (dispatch, id, info) => {
  dispatch(fetchStart());
  try {
    const res = await axios.post(
      `http://localhost:8800/api/flowers/${id}/reviews`,
      info,
      configData
    );

    dispatch(fetchSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
    // console.log(err.response.data.message);
  }
};

export const fetchProducts = async (dispatch) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.get(
      `http://localhost:8800/api/${input[type]}s`,
      config
    );
    dispatch(fetchSuccess(data));
    return data;
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
  }
};

export const getSearchProducts = async (dispatch, type) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.get(
      `http://localhost:8800/api/${type}s`,
      configData
    );

    dispatch(fetchSuccess(data));
    return { data, type };
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
  }
};

export const getSearchedProducts = async (dispatch, type, name) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.get(
      `http://localhost:8800/api/${type}s?search=${name}`,
      config
    );

    dispatch(fetchSuccess(data));
    return data;
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
  }
};

export const addToCart = async (dispatch, url, info) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.post(url, info, configData);

    dispatch(fetchSuccess(data));
    return data;
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
    console.log(err.response.data.message);
  }
};

export const checkAndAddToCart = async (dispatch, url, info) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.patch(url, info, configData);
    dispatch(fetchSuccess(data));
    return data;
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
    console.log(err.response.data.message);
  }
};

export const getProduct = async (dispatch, url) => {
  dispatch(fetchStart());
  try {
    const { data } = await axios.get(url, configData);
    console.log(data);
    dispatch(fetchSuccess(data));
    return data;
  } catch (err) {
    dispatch(fetchFailure(err.response.data.message));
    console.log(err.response.data.message);
  }
};

export const uploadBuoquet = async (url, info) => {
  try {
    const { data } = await axios.post(url, info, config);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getBuoquets = async (url) => {
  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getItems = async (url) => {
  try {
    const { data } = await axios(url, configData);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteProduct = async (url) => {
  try {
    const { data } = await axios.delete(url);
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
