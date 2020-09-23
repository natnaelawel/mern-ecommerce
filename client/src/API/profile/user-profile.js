import axios from '../Axios'

export const readProfile = async (userId, token)=>{
     try {
       const { data } = await axios.get(`/user/${userId}`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       return data;
     } catch (err) {
       return err.response.data;
     }
}

export const updateProfile = async (userId, token, profile) => {
  console.log("user id ", userId, token);
  return await axios
    .put(`/profile/${userId}`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const updateUser = (user, next)=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth))
        }
        next()
    }
}