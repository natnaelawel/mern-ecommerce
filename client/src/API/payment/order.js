import axios from '../Axios'

export const createOrder = async (userId, token, order) => {
  return await axios
    .post(`/order/${userId}`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
        // "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
};
