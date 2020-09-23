import axios from "../Axios";

export const createProduct = async (userId, token, product) => {
  console.log('user id ', userId, token)
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

export const fetchProductPhoto = async (productId) => {
  return await axios
    .get(`/product/photo/${productId}`, {
      headers: {
        responseType: "blob",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const fetchFilteredProduct = async ({
  filters = {},
  skip = 0,
  limit = 6,
  order = "desc",
}) => {
  const filterData = {
    filters,
    skip,
    limit,
    order,
    sortBy: "quantity",
  };
  try {
    console.log("data is ", filterData);
    const { data } = await axios.post("/product/by/search", filterData);
    return data;
  } catch (error) {
    return error.response.data;
  }
  //   return await axios
  //     .post(`/product/by/search`, filterData)
  //     .then((res) => {
  //       console.log(res.data);
  //       return res.data.data;
  //     })
  //     .catch((err) => {
  //     });
};
