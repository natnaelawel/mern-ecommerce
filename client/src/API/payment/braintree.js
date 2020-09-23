import axios from "../Axios";


export const getBraintreeClientToken = async (userId, token)=>{
      const url = `/braintree/getToken/${userId}`;
    console.log('url is ', url)
    return await axios
      .get(url, { 
          headers: {
              Authorization: `Bearer ${token}`
            }
        }
        )
      .then((res) => {
          console.log('data is ', res.data)
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
}

export const processPayment = async(userId, token, paymentData)=>{
      const url = `/braintree/payment/${userId}`;
      console.log("url is ", url);
      return await axios
        .post(url, paymentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("data is ", res.data);
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
}