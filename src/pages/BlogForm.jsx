import React, { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReloadData, setSelectedEditBlogData } from "../redux/rootSlice";

export const BlogForm = () => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedEditBlogData } = useSelector((state) => state.root);

  const addAndEditBlog = async ({ blog_name, title, short_description }) => {
    const formData = new FormData();
    formData.append("blog_name", blog_name);
    formData.append("title", title);
    formData.append("short_description", short_description);
    if (file) {
      formData.append("image", file);
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://abhinash.itflyweb.cloud/api/insert_blog.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/admin-panel");
        // window.location.reload();
        dispatch(setReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      <div>
        <h1 className="text-center text-2xl bg-primary text-white py-2 mb-5">
          <u>{selectedEditBlogData ? "Edit Blog" : "Add Blog"}</u>
        </h1>
        <div className="p-6">
          <Form
            layout="vertical"
            onFinish={addAndEditBlog}
            initialValues={selectedEditBlogData}
            key={selectedEditBlogData ? selectedEditBlogData.id : "true"}
          >
            <Form.Item label="Blog Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Blog Name" name="blog_name">
              <Input />
            </Form.Item>
            <Form.Item label="Blog Image" name="image">
              <Input
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handleFileUpload}
              />
            </Form.Item>
            <Form.Item label="Short Description" name="short_description">
              <Input />
            </Form.Item>
            <div className="flex justify-end gap-5">
              <button
                className="border px-5 py-1 border-primary !text-primary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setSelectedEditBlogData(null));
                  navigate("/admin-panel");
                }}
              >
                Cancel
              </button>
              <button
                className="!text-white bg-primary px-5 py-1 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : selectedEditBlogData
                  ? "Edit"
                  : "Add"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
