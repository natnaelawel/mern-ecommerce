import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchSearchedCategories,
} from "../../API/admin/category";

function Search({ handleSearchQuery }) {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    category: "all",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await fetchCategories());
    };
    try {
      fetchData();
    } catch (error) {}
  }, []);

  const handleChange = (name) => (event) => {
    if (name === "queryText") {
      const query = { ...searchQuery, search: event.target.value };
      setSearchQuery(query);
      handleSearchQuery(query);
    } else {
      const query = { ...searchQuery, category: event.target.value };
      setSearchQuery(query);
      handleSearchQuery(query);
    }
  };
  return (
    <div className="input-group my-3 container ">
      <div className="input-group input-group-lg">
        <select
          className="input-group-prepend btn mr-2  px-3 btn-outline-secondary"
          onChange={handleChange("category")}
        >
          <option value="all" defaultChecked>
            All
          </option>
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <input
          onChange={handleChange("queryText")}
          type="text"
          placeholder="Search here"
          className="form-control px-4 py-2"
        />
      </div>
    </div>
  );
}

export default Search;
