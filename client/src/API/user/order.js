
import axios from '../Axios'
export const fetchPurchaseHistory = async (userId, token) => {
  try {
    const { data } = await axios.get(`/user/${userId}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return err.response.data;
  }
};
