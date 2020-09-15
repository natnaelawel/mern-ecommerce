import React, { useState, useEffect } from "react";
import moment from "moment";

import Base from "../base/Base";
import { useParams, Redirect } from "react-router-dom";
import {
  fetchSingleProduct,
  fetchRelatedProducts,
} from "../../API/admin/category";
import { isAuthenticated } from "../../API/auth";
import { API_URL } from "../../config";
import "./ProductDetail.css";
import Card from "../Product/Card";
import TextTruncate from "react-text-truncate";
import {addItemToCart} from '../../helpers/cart'

function ProductDetail() {
  const { productId } = useParams("productId");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [redirect, setRedirect] = useState(false)
  const {
    user: { _id },
  } = isAuthenticated();
  const productPhoto = `${API_URL}/product/photo/${product._id}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProduct(await fetchSingleProduct(productId, _id));
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setRelatedProducts(await fetchRelatedProducts(productId));
      // console.log('related product', relatedProducts)
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, []);

  const shouldRedirect = ()=>{
      if(redirect){
          return <Redirect to="/cart" />
        }
    }
  const handleAddToCart = ()=>{
      console.log('add to cart is clicked')
      addItemToCart(product, ()=>setRedirect(true))
  }
  return (
    <Base
      title={product.name}
      description={product.description}
      className="container"
    >
        {shouldRedirect()}
      <div className="row product__detail">
        <div className="col-md-6">
          <img
            onError={(e) =>
              (e.target.src =
                "https://www.josco.com.au/wp-content/uploads/2016/05/Image-Unavailable.jpg")
            }
            src={productPhoto}
            alt="product image"
            className="card-img-top"
          />
          <div className="actions my-4 ">
            <button onClick={handleAddToCart} className="btn btn-warning py-2 px-5  border border-dark font-weight-bold">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-md-4">
          {/* <div className="row"> */}
          <h1 className="font-weight-bold text-capitalize text-muted my-3">
            {product.name}
          </h1>
          {/* <h3 className="text-muted text-capitalize">{product.description}</h3> */}
          <TextTruncate
            className="text-lower-case my-3 lead h5"
            element="h5"
            line={3}
            truncateText="..."
            text={product.description}
          />
          <h2 className="h2 text-muted my-3">Price: ${product.price}</h2>
          <h4 className="h4 text-muted lead">Category: {product.category?.name}</h4>
          <p className="lead">
            {!product.shipping && "The item cann't be shipped"}
          </p>
          <p className="lead">Available Quantity {product.quantity}</p>
          <p className="lead">Added on {moment(product.createdAt).fromNow()}</p>
          <button className="btn btn-primary rounded px-4 py-1">
            In Stock.{" "}
          </button>
          <button className="btn btn-primary px-4 py-1 mx-3">
            Contact supplier
          </button>
          {/* </div> */}
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="related__products">
          <h1 className="my-3">Related Products</h1>
          <div className="row">
            {relatedProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Base>
  );
}

export default ProductDetail;
