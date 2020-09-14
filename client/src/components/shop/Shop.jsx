import React, { useEffect, useState } from "react";
import Base from "../base/Base";
import Checkbox from "./CategoryCheckbox/Checkbox";
import Card from "../Product/Card";
import PriceRadio from "./PriceRadio/Radio";
import "./Shop.css"
import { fetchFilteredProduct } from "../../API/admin/product";

function Shop() {
    const prices = [
      {
        id: 0,
        name: "Any",
        value: [],
      },
      {
        id: 1,
        name: "lessthan 20",
        value: [0, 9],
      },
      {
        id: 2,
        name: "10 to 19",
        value: [10, 19],
      },
      {
        id: 3,
        name: "20 to 49",
        value: [20, 49],
      },
      {
        id: 4,
        name: "50 to 100",
        value: [50, 99],
      },
      {
        id: 5,
        name: "morthan 100",
        value: [100, 200],
      },
    ];

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)

  const [filter, setFilter] = useState({
    category: [],
    price: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('filter data is ', filter)
      const {data} = await fetchFilteredProduct({filters: filter, limit})
      setCategories(data);
      console.log('datas are ', data)
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, [filter]);

  const handleFilters = (filters, filterBy) => {
    console.log("filters are ", filters);
    if (filterBy === "categories") {
      setFilter({ ...filter, category: filters });
    }
    if (filterBy === "price") {
      setFilter({ ...filter, price: filters });
    }
  };

  const handleLoadMore = () => {
    const skipData = skip + limit;
    setSkip(skipData);
    const fetchData = async () => {
      setLoading(true);
      let fetchedData = await fetchFilteredProduct({
        filters: filter,
        limit,
        skip: skipData,
      });
      setCategories([...categories, ...fetchedData.data]);
      setLoading(false);
    };
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="shop">
      <Base
        title="Shop page"
        description="sample shop page"
        className="container"
      >
        <div className="row">
          <div className="col-md-3">
            <h5>Filter by categories</h5>
            <ul className="list-group">
              <Checkbox
                handleFilters={(filters) =>
                  handleFilters(filters, "categories")
                }
              />
            </ul>
            <h5 className="my-2">Filter by categories</h5>
            <ul className="list-group">
              <PriceRadio
                handleFilters={(filters) => handleFilters(filters, "price")}
                prices={prices}
              />
            </ul>
          </div>

          <div className="col-md-9">
            <div className="row">
              {categories &&
                categories.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
            </div>
          </div>
          <div className="col-md-12 text-center my-5">
              <div className="btn btn-outline-secondary" onClick={handleLoadMore}>Load More</div>
          </div>
        </div>
      </Base>
    </div>
  );
}

export default Shop;

//   const handleFilters = (categoryFilter) => {
//     console.log("filters are ", categoryFilter);
//     setFilter({ ...filter, categories: categoryFilter });
//   };