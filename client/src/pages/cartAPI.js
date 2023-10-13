import axios from "axios";

export const removeCartItem = async (id) => {
  try {
    const { data } = await axios.delete("/api/carts/" + id);
    return data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};
