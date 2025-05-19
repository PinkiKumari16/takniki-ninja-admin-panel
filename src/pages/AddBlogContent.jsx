import React, { useState, useEffect, useRef } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, setReloadData, showLoading } from "../redux/rootSlice";
import { Loader } from "../components/Loader";

export const AddBlogContent = () => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [contentKey, setContentKey] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [contentData, setContentData] = useState(null);

  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEditBlogData, loading } = useSelector((state) => state.root);

  const editorConfig = {
    readonly: false,
    height: 500,
    toolbar: true,
    toolbarAdaptive: false,
    showXPathInStatusbar: false,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "ul",
      "ol",
      "outdent",
      "indent",
      "|",
      "paragraph",
      "fontsize",
      "brush",
      "align",
      "|",
      "link",
      "image",
      "table",
      "hr",
      "quote",
      "code",
      "|",
      "undo",
      "redo",
      "fullsize",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const fetchBlogContent = async (id) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(
        `https://abhinash.itflyweb.cloud/api/get_blog_contents.php?blog_id=${id}`
      );

      if (response.data.success && response.data.contents.length) {
        const content = response.data.contents[0];
        setContentData(content);
        form.setFieldsValue({
          section_title: content.section_title,
        });
        setEditorContent(content.content);
        setContentKey((prev) => prev + 1); 
        setImageUrl(content.image_path);
      }
    } catch (error) {
      message.error("Failed to fetch blog content.");
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (blogId) {
      form.setFieldsValue({ blog_id: blogId });
      if (selectedEditBlogData) {
        fetchBlogContent(blogId);
      }
    }
  }, [blogId]);

  const saveBlogContent = async ({ blog_id, section_title }) => {
    if (!editorContent.trim()) {
      message.error("Please enter content.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("blog_id", blog_id);
    formData.append("section_title", section_title);
    formData.append("content", editorContent);

    if (file) {
      formData.append("image", file);
    } else if (contentData?.image_path) {
      formData.append("existing_image_path", contentData.image_path);
      formData.append("content_id", contentData.id);
    }

    try {
      let response;
      if (contentData) {
        console.log("edit content..........");
        response = await axios.post(
          "https://abhinash.itflyweb.cloud/api/edit_blogContains.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        console.log("add content..........");
        response = await axios.post(
          "https://abhinash.itflyweb.cloud/api/insert_blog_content.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(setReloadData(true));
        navigate("/admin-panel");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
      dispatch(setReloadData(false));
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white border border-gray-300 rounded shadow-xl max-w-7xl mx-auto mt-5">
          <h1 className="text-center text-white text-2xl bg-primary py-3 mb-5 rounded-t">
            {contentData ? "Edit Blog Content" : "Add Blog Content"}
          </h1>

          <div className="p-6 text-black text-base">
            <Form
              form={form}
              layout="vertical"
              onFinish={saveBlogContent}
              initialValues={{ blog_id: blogId }}
            >
              <Form.Item label="Blog ID" name="blog_id">
                <Input readOnly />
              </Form.Item>

              <Form.Item
                label="Section Title"
                name="section_title"
                rules={[
                  { required: true, message: "Please enter section title" },
                ]}
              >
                <Input placeholder="Enter section title" />
              </Form.Item>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Content</label>
                <JoditEditor
                  key={contentKey}
                  ref={editor}
                  config={editorConfig}
                  value={editorContent}
                  onBlur={(newContent) => setEditorContent(newContent)}
                />
              </div>

              <Form.Item label="Upload Image">
                {imageUrl && !file && (
                  <div className="mb-3">
                    <img
                      src={`https://abhinash.itflyweb.cloud/api/${imageUrl}`}
                      alt="Blog"
                      className="w-44 h-28 object-cover border rounded"
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  onChange={handleFileUpload}
                />
              </Form.Item>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="border px-5 py-2 border-primary text-primary rounded hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/admin-panel");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-primary px-6 py-2 rounded hover:bg-primary-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Save"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
