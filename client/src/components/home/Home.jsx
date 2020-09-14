import React, { useState } from "react";
import Base from "../base/Base";
import { useEffect } from "react";
import { fetchProducts } from "../../API/home";
import Card from "../Product/Card";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [productBySell, setProductBySell] = useState("");
  const [productByArrival, setProductByArrival] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProductBySell(await fetchProducts("sold"));
      setProductByArrival(await fetchProducts("createdAt"));
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, []);
  return (
    <div className="home">
      <Base
        title="Home page"
        description="sample home page"
        className="container"
      >
        {loading && <h1>Loading</h1>}
        {/* {JSON.stringify(productBySell)} */}
        {/* <hr/> */}
        {/* {JSON.stringify(productByArrival)} */}
        <div className="productByArrival">
          <h2 className="col-12">Product by sell</h2>
          <div className="row">
            {productBySell &&
              productBySell.map((product) => (
                <Card key={product._id} product={product} />
              ))}
          </div>
        </div>

        <hr />
        <div className="productByArrival">
          <h2 className="col-12">Product by arrival</h2>
          <div className="row">
            {productByArrival &&
              productByArrival.map((product) => (
                <Card key={product._id} product={product} />
              ))}
          </div>
        </div>
      </Base>
    </div>
  );
}

export default Home;
