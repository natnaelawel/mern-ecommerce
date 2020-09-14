import axios from "../Axios";

export const fetchProducts = async (sortBy='bysell', order="desc", limit=5) => {
  return await axios
    .get(`/product?sortBy=${sortBy}&order=${order}&limit=${limit}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
