import React from "react";
import { BlogCard } from "../components/BlogCard";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const BlogSection = () => {
  const navigate = useNavigate();
  const { blogData } = useSelector((state) => state.root);

  return (
    <>
      <h1 className="text-3xl font-bold text-white text-center">
        Publish Blogs
      </h1>
      <hr className="mt-2 mb-2 border border-border-color" />
      <div className="text-right">
        <Tooltip title="Add the new blog" placement="top" color="gray">
          <button
            className="px-6 bg-primary text-white mt-1 py-1 border border-border-color rounded"
            onClick={() => {
              navigate("/blog-form");
            }}
          >
            <span className="block md:hidden text-2xl font-bold">+</span>
            <span
              className="hidden md:block"
              onClick={() => {
                // setActiveTab("BlogForm");
                navigate("/blog-form");
              }}
            >
              Add New Blog
            </span>
          </button>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {blogData.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};
