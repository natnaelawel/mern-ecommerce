import axios from "../Axios";
import { API_URL } from "../../config";

export const signUp = (name, email, password, passwordConfirmation) => {
  console.log("before adding");
  return fetch(`${API_URL}/auth/signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      passwordConfirmation,
    }),
  })
    .then((result) => result.json())
    .then((result) => result)
    .catch((err) => {
      console.log("resulerrting");
      console.log("error is ", err);
    });
  };

  
export const signIn = (email, password) => {
  const data = JSON.stringify({
    email: email,
    password: password,
  });
  // console.log('data is ', data)
  // return fetch(`${API_URL}/auth/signin`, {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: data,
  // })
  //   .then((result) => result.json())
  //   .then((result) => {
  //     console.log('result ', result)
  //     return result})
  //   .catch((err) => {
  //     console.log("error is ", err);
  //   });
  return axios
    .post("/auth/signin",{password, email})
    .then(res =>res.data)
    .catch((err) => {
      console.log(err);
      return err.response.data
    });
};

export const signOut = (next)=>{
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return axios
    .get("/auth/signout")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
  }
}

export const authenticate = (data, next)=>{
  if(typeof window !== 'undefined'){
    localStorage.setItem('jwt', JSON.stringify(data))
    next()
    
  }
}

export const isAuthenticated = ()=>{
   if (typeof window === "undefined") {
     return false
   }
  if(localStorage.getItem('jwt')){ 
    return JSON.parse(localStorage.getItem("jwt"))
   }else{
     return false
   }
}

  // axios
  //   .post("/auth/signin", {
  //     email,
  //     password,
  //   })
  //   .then(res =>res.json())
  //   .then(res => {
  //     console.log('data ', res)
  //     return res
  //   })
  //   .catch((err) => {
  //     console.error("my error");

  //     console.log(err);
  //   });
  // }
  
  // try {
  //   const data = await axios.post("/auth/signup", {
  //     name,
  //     email,
  //     password,
  //     passwordConfirmation,
  //   });
  //   console.log(
  //     'inside try'
  //   )
  //   return data

  // } catch (error) {
  //   console.log(error)
  //   console.log("inside catch");  }
