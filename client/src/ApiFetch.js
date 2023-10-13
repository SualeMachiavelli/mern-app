import axios from "axios";
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { user: null };
const { token } = user;

console.log(token);

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + token,
  },
};
export const uploadFlower = async (data) => {
  try {
    const res = await axios.post("http://localhost:8800/api/flowers", data);
    console.log(res);
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
};
function saveData(data) {
  return JSON.stringify(localStorage.setItem("user", JSON.stringify(data)));
}
export const login = async (info) => {
  try {
    // const res = await fetch("/api/users/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    const { data } = await axios.post("/api/users/login", info);

    saveData(data);
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const signup = async (info) => {
  try {
    const { data } = await axios.post("/api/users/signup", info);
    console.log(data);
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

export const createOrder = async (info) => {
  try {
    const { data } = await axios.post("/api/orders", info, config);
    console.log(data);
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};
