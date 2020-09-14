import React from "react";
import Menu from "../menu/Menu";
import Search from "../Search/Search";

function Base({
  title = "Title",
  description = "Description",
  className,
  children,
}) {

  document.title= title

  return (
    <div>
      <Menu />
      <Search/>
      <h3 className="container my-2">{title}</h3>
      <div className={className}>{children}</div>
    </div>
  );
}

export default Base;
