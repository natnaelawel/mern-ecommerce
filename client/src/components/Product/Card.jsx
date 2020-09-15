import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { fetchProductPhoto } from "../../API/admin/product";
import TextTruncate from "react-text-truncate";
import { API_URL } from "../../config";

function Card({ product }) {
    // const [photo, setPhoto] = useState()
  const productPhoto = `${API_URL}/product/photo/${product._id}`;
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchProductPhoto(product._id);
//       console.log('image is ', data)
//     };
//     try {
//       fetchData();
//     } catch (error) {
//       setPhoto(
//          '"https://m.media-amazon.com/images/I/411Forn86vL._SY346_.jpg"'
//       );
//     }
//   }, []);
  return (
    <div className="product col-md-3 p-2">
      <Link
        className="product__card card"
        to={{
          pathname: `/product/${product._id}`,
          params: `${product._id}`,
        }}
      >
        <img
          onError={(e) =>
            (e.target.src =
              "https://www.josco.com.au/wp-content/uploads/2016/05/Image-Unavailable.jpg")
          }
          src={productPhoto}
          alt="product image"
          className="card-img-top"
        />
        <div className="card-body">
          <TextTruncate
            className="card-title m-0 p-0"
            line={1}
            element="h5"
            truncateText="..."
            text={product.name}
          />
          <TextTruncate
            className="card-text"
            line={2}
            element="p"
            truncateText="..."
            text={product.description}
          />
          <h5 className="card-title" style={{ padding: "0", margin: "0" }}>
            ${product.price}
          </h5>
        </div>
      </Link>
    </div>
  );
}

export default Card;
