export const addItemToCart = (item, next)=>{
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })

        cart = Array.from(new Set(cart.map(item => item._id))).map(id => {
            return cart.find(item => item._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()

    }
}

export const getItemTotal = ()=>{
     if (typeof window !== "undefined") {
       if (localStorage.getItem('cart')) {
         return  JSON.parse(localStorage.getItem('cart')).length
       }
    }
    return 0
}

export const getAllCartItems = ()=>{
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
    return [];
}

export const updateCartItem = (productId, count, next)=>{
    let cart = []
     if (typeof window !== "undefined") {
       if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
       }

       cart.map((product, index)=>{
           if(product._id === productId){
               cart[index].count= count
           }
       })
       localStorage.setItem("cart", JSON.stringify(cart));
       next();
     }
}

export const deleteCartItem = (productId, next)=>{
      let cart = [];
      if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart = cart.filter((product) => product._id !== productId)

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
      }
}

export const getTotalPrice = ()=>{
     let cart = [];
     if (typeof window !== "undefined") {
       if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
       }

       return cart.reduce((current, nextProduct) =>{
            return current + nextProduct.count * nextProduct.price
       } ,0);
     }
}

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem('cart')
    }

    next();
  }
};