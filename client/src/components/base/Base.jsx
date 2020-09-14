import React from "react";
import Menu from "../menu/Menu";

function Base({
  title = "Title",
  description = "Description",
  className,
  children,
}) {
  return (
    <div>
      <Menu />
      <h3 className="container my-2">{title}</h3>
      <div className={className}>{children}</div>
    </div>
  );
}

export default Base;
