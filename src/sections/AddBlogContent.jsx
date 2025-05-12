import { Form, Input, message } from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

export const AddBlogContent = ({ blogId }) => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [contentKey, setContentKey] = useState(0);

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

  useEffect(() => {
    if (blogId) {
      form.setFieldsValue({ blog_id: blogId });
    }
  }, [blogId, form]);

  const addBlogContent = async ({ blog_id, section_title }) => {
    const formData = new FormData();
    formData.append("blog_id", blog_id);
    formData.append("content", editorContent);
    formData.append("section_title", section_title);
    if (file) {
      formData.append("image", file);
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://abhinash.itflyweb.cloud/api/insert_blog_content.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        setEditorContent("");
        setContentKey((prev) => prev + 1);
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="bg-white border border-border-color shadow-2xl shadow-border-color">
      <h1 className="text-center text-white text-2xl bg-primary text-gray-250 py-2 mb-5">
        Add The Blog Content
      </h1>
      <div className="p-6 text-xl text-white">
        <Form
          form={form}
          layout="vertical"
          onFinish={addBlogContent}
          initialValues={{ blog_id: blogId }}
        >
          <Form.Item label="Blog ID" name="blog_id">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Section Title" name="section_title">
            <Input />
          </Form.Item>

          {/* Blog-style rich text editor */}
          <JoditEditor
            key={contentKey}
            ref={editor}
            config={editorConfig}
            defaultValue={editorContent}
            onBlur={(newContent) => setEditorContent(newContent)}
          />

          <Form.Item label="Image" name="image">
            <Input
              type="file"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </Form.Item>

          <div className="flex justify-end gap-5 mt-4">
            <button
              className="border px-5 py-1 border-primary !text-primary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
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
              {isSubmitting ? "Submitting..." : "Add"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
