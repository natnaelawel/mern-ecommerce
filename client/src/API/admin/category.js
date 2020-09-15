import axios from "../Axios";
import { isAuthenticated } from "../auth";
import queryString from 'query-string'

const tokenConfig = () => {
  const token = isAuthenticated() ? isAuthenticated().user.token : null;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
export const createCategory = async (userId, token, name)=>{
      return await axios
        .post(`/category/${userId}`, { name }, {headers: {Authorization: `Bearer ${token}`}})
        .then((res) =>{
            console.log(res.data)
            return res.data
        } 
        )
        .catch(err => {
            return err.response.data
          console.log('error is ', err.response.data);
        });
}

export const fetchCategories = async()=>{
  return await axios
    .get(
      `/category`,
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
;

export const fetchSearchedCategories = async params => {
  const query = queryString.stringify(params)
  console.log('query is ', query)
  return await axios
    .get(`/product/search?${query}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const fetchSingleProduct = async (id, userId) =>{
    const url = `/product/${id}/${userId}`;
    console.log('url is ', url)
    return await axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
}

export const fetchRelatedProducts = async (id)=>{
      const url = `/product/related/${id}`;
      return await axios
        .get(url)
        .then((res) => {
          console.log('data is ', res)
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
}