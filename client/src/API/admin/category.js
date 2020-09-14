import axios from "../Axios";
import { isAuthenticated } from "../auth";

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