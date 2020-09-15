import React, { useState } from "react";
import Base from "../base/Base";
import { useEffect } from "react";
import { fetchProducts } from "../../API/home";
import Card from "../Product/Card";
import "./Home.css";
import Search from "../Search/Search";
import { fetchSearchedCategories } from "../../API/admin/category";

function Home() {
  const [products, setProducts] = useState([]);
  const [productBySell, setProductBySell] = useState("");
  const [productByArrival, setProductByArrival] = useState("");
  const [productSearched, setProductSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProductBySell(await fetchProducts("sold"));
      setProductByArrival(await fetchProducts("createdAt"));
      setLoading(false);
    };
    try {
      if (isSearching) {
        return;
      }
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, [isSearching]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProductSearched(await fetchSearchedCategories(searchQuery));
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, [searchQuery]);

  const handleSearchQuery = (searchQueryData) => {
    setSearchQuery(searchQueryData);
    console.log("search query is ", searchQueryData.search);
    if (searchQueryData.search === "") {
      setIsSearching(false);
      console.log("is searcing is empty", isSearching);
    } else {
      setIsSearching(true);
    }
  };
  return (
    <div className="home">
      <Base
        title="Home page"
        description="sample home page"
        className="container"
      >
        <Search handleSearchQuery={handleSearchQuery} />

        {loading && <h1>Loading</h1>}
        {isSearching ? (
          <div className="searchResult">
            {productSearched.length > 0 ? (
              <>
                <h2 className="col-12">Search Result</h2>
                <h5>{productSearched.length} Product has Found</h5>
              </>
            ) : (
              <h2>No Product Found</h2>
            )}
            <div className="row">
              {productSearched.length > 0 &&
                productSearched.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </Base>
    </div>
  );
}

export default Home;
