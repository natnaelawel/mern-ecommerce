import axios from "../Axios";

export const getProduct = async (productId, token) => {
  try {
    const { data } = await axios.get(`/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return err.response.data;
  }
};


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

export const editProduct = async (productId, userId, token, product) => {
  console.log("user id ", userId, token);
  return await axios
    .put(`/product/${productId}/${userId}`, product, {
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
export const deleteProduct = async (productId, userId, token) => {
  return await axios
    .delete(`/product/${productId}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
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


export const fetchProducts = async (
  sortBy = "bysell",
  order = "desc",
  limit = 5
) => {
  return await axios
    .get(`/product?sortBy=${sortBy}&order=${order}&limit=${limit}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};