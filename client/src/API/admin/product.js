import axios from "../Axios";

export const createProduct = async (userId, token, product) => {
  return await axios
    .post(`/product/${userId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
