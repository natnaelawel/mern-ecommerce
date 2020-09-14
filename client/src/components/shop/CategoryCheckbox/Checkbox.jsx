import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../../API/admin/category";

function Checkbox({handleFilters}) {
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [categories, setCategories] = useState([])

   useEffect(() => {
     const fetchData = async () => {
       setCategories(await fetchCategories());
     };
     try {
       fetchData();
     } catch (error) {
     }
   }, []);
  const handleToggle = (categoryId) => () => {
      const id = checkedCategories.indexOf(categoryId);
    const newCategory = [...checkedCategories];
    if (id === -1) {
      newCategory.push(categoryId);
    } else {
      newCategory.splice(id, 1);
    }
    console.log("checked categories ", newCategory);
    setCheckedCategories(newCategory);
    handleFilters(newCategory)
  };

  return (
    <>
      {categories.map((category) => (
        <li key={category._id} className="list-group-item px-2 list-unstyled">
          <input
            type="checkbox"
            // value={checkedCategories.indexOf(category._id === -1)}
            id={category._id}
            className="form-radio-input mr-2"
            onChange={handleToggle(category._id)}
          />
          <label htmlFor={category._id}>{category.name}</label>
        </li>
      ))}
    </>
  );
}

export default Checkbox;
