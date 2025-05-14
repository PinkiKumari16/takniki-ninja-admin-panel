import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReloadData, setSelectedEditBlogData } from "../redux/rootSlice";

export const BlogForm = () => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNextButtonShow, setIsNextButtonShow] = useState(false);
  const [blogId, setBlogId] = useState(0);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { selectedEditBlogData } = useSelector((state) => state.root);
  console.log(selectedEditBlogData);
  useEffect(() => {
    if (selectedEditBlogData) {
      setBlogId(selectedEditBlogData.id);
    }
  }, [selectedEditBlogData]);
  console.log(blogId);

  const handleEditValues = () => {
    setIsEditDisable(false);
  };

  const addAndEditBlog = async ({ blog_name, title, short_description }) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("blog_name", blog_name);
    formData.append("title", title);
    formData.append("short_description", short_description);
    if (file) {
      formData.append("image", file);
    }

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
        setBlogId(response.data.blog_id);
        if (!selectedEditBlogData) {
          form.resetFields();
          setFile(null);
        }
        setIsNextButtonShow(true);

        dispatch(setReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmitting(false);
      dispatch(setReloadData(false));
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleEditValues();
  };

  return (
    <div>
      <h1 className="text-center text-2xl bg-primary text-white py-2 mb-5">
        <u>{selectedEditBlogData ? "Edit Blog" : "Add Blog"}</u>
      </h1>
      <div className="p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={addAndEditBlog}
          initialValues={selectedEditBlogData}
          key={selectedEditBlogData ? selectedEditBlogData.id : "new"}
        >
          <Form.Item label="Blog Title" name="title">
            <Input onChange={handleEditValues} />
          </Form.Item>
          <Form.Item label="Blog Name" name="blog_name">
            <Input onChange={handleEditValues} />
          </Form.Item>
          <Form.Item label="Blog Image" shouldUpdate>
            {() => (
              <div>
                {selectedEditBlogData?.image_path && !file && (
                  <img
                    src={`https://abhinash.itflyweb.cloud/api/${selectedEditBlogData.image_path}`}
                    alt="Blog"
                    className="mb-3 w-45 h-32 object-cover border"
                  />
                )}
                <Form.Item name="image" noStyle>
                  <Input
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleFileUpload}
                  />
                </Form.Item>
              </div>
            )}
          </Form.Item>

          <Form.Item label="Short Description" name="short_description">
            <Input onChange={handleEditValues} />
          </Form.Item>

          <div className="flex justify-end gap-5 mt-6">
            <button
              className="border px-5 py-1 border-primary text-primary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setSelectedEditBlogData(null));
                navigate("/admin-panel");
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-5 py-1 rounded-md transition duration-200 ${
                isSubmitting || isEditDisable
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-800"
              }`}
              disabled={isSubmitting || isEditDisable}
            >
              {selectedEditBlogData
                ? "Edit"
                : isSubmitting
                ? "Submitting..."
                : "Save"}
            </button>

            {(isNextButtonShow || selectedEditBlogData) && (
              <button
                className="bg-primary text-white px-5 py-1 rounded-md hover:bg-blue-800 transition"
                onClick={() => navigate("/content-form/" + blogId)}
              >
                Next
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
