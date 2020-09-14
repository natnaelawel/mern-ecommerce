import React from "react";

function Search() {
  return (
    <div className="input-group my-3 container ">
      <div className="row">
        <div className="col-md-3">
          <select className="form-control input-group-prepend ">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="input-group-append">
              @
          </div>
        </div>
        <div className="col-md-9">
          <input type="text" className="form-control" />
        </div>

      </div>
    </div>
  );
}

export default Search;
