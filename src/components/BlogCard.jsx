import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedEditBlogData } from "../redux/rootSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const BlogCard = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { image_path, blog_name, short_description } = blog;
  // console.log(image_path);

  const getSelectedBlogData = async (id) => {
    try {
      const res = await axios.get(
        "https://abhinash.itflyweb.cloud/api/get_blog_contents.php?blog_id=" +
          id
      );
      console.log(res.data.contents[0]);
      if (res.data.success) {
        dispatch(setSelectedEditBlogData(res.data.contents[0]));
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="border-2 border-border-color rounded p-2 lg:p-4 bg-transparent">
        <img
          src={"https://abhinash.itflyweb.cloud/api/" + image_path}
          alt={blog_name}
          className="w-full object-cover rounded mb-2"
        />
        <h2 className="text-lg font-bold text-center text-white">
          {blog_name}
        </h2>
        <p className="line-clamp-3 text-gray-200 mb-2">{short_description}</p>
        <div className="flex gap-5 justify-end">
          <button className="p-1 px-3 bg-red-500 text-white">Delete</button>
          <button
            className="p-1 px-3 bg-primary border border-border-color text-white"
            onClick={() => {
              // getSelectedBlogData(blog.id);
              dispatch(setSelectedEditBlogData(blog));
              navigate("/blog-form");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
