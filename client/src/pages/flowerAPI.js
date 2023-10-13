import axios from "axios";
const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + token,
  },
};

export const saveCart = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

export const createOrder = async (info) => {
  try {
    const data = await axios.post(
      "http://localhost:8800/api/orders",
      info,
      config
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const checkFlower = async (id) => {
  try {
    const { data } = await axios.get("/api/carts/" + id + "/flower", config);
    return data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const checkCard = async (id) => {
  try {
    const { data } = await axios.get("/api/carts/" + id + "/card", config);
    return data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};
