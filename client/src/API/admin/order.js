import axios from "../Axios";

export const fetchOrders = async (userId, token) => {
//   return await axios
//     .get(`/order/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
    try {
        const {data} = await axios.get(`/order/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data
        
    } catch (err) {
         return err.response.data;
    }
};

export const updateOrderStatus = async ({orderId, status, token, userId})=>{
    console.log('id is ', orderId)
    try {
        const {data} = await axios.put(
          `/order/${userId}`,
          { status, orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data)
        return data
    } catch (error) {
        return error.response.data
    }
}