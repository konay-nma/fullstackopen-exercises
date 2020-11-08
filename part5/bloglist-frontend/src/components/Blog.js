import React, { useState } from "react";

const Blog = ({ blog , updateLike, deleteBlog}) => {
  const [isShowedDetail, setShowDetail] = useState(false);

  const display = { display: isShowedDetail ? "" : "none" };
  const buttonLable = isShowedDetail ? "hide" : "view";

  const toggleDetail = () => {
    setShowDetail(!isShowedDetail);
  };

  const blogStyle = {
    paddingTop: 10,
    paddigLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleDetail}>{buttonLable}</button>
      <div style={display}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick = {updateLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick = {deleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
