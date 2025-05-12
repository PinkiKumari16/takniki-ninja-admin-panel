import React, { useState } from "react";
import { Form, Input, message, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReloadData, setSelectedEditCourseData } from "../redux/rootSlice";
import TextArea from "antd/es/input/TextArea";

export const CourseForm = () => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedEditCourseData } = useSelector((state) => state.root);
  console.log(selectedEditCourseData);
  const addAndEditCourse = async (values) => {
    console.log(values);
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      <div>
        <h1 className="text-center text-2xl bg-primary text-white py-2 mb-5">
          <u>{selectedEditCourseData ? "Edit Course" : "Add Course"}</u>
        </h1>
        <div className="p-6">
          <Form
            layout="vertical"
            onFinish={addAndEditCourse}
            initialValues={selectedEditCourseData}
            key={selectedEditCourseData ? selectedEditCourseData.id : "true"}
          >
            <Form.Item label="Blog Title" name="title">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Blog Image URL" name="thumbnail_image">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Short Description" name="description">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Long Description" name="longDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="Requirement" name="requirement">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Syllabus" name="syllabus">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Last Updated At" name="lastUpdatedAt">
              <Input type="date"></Input>
            </Form.Item>
            <Form.Item
              label="Course Language"
              name="language"
              rules={[
                {
                  message: "Please select the course language!",
                },
              ]}
            >
              <Select placeholder="Select Course Language">
                <Select.Option value="English">English</Select.Option>
                <Select.Option value="Spanish">Spanish</Select.Option>
                <Select.Option value="French">French</Select.Option>
                <Select.Option value="German">German</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Created By" name="instructor">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Course Duration" name="duration">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Total Lecture" name="lessons">
              <Input type="number"></Input>
            </Form.Item>
            <Form.Item label="Trailer Video" name="trailerVideo">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Total Section" name="totalSection">
              <Input type="number"></Input>
            </Form.Item>
            <Form.Item label="Course Materials" name="courseMaterials">
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Level"
              name="level"
              rules={[{ message: "Please select the course level!" }]}
            >
              <Select placeholder="Select Course Level">
                <Select.Option value="beginner">Beginner</Select.Option>
                <Select.Option value="intermediate">Intermediate</Select.Option>
                <Select.Option value="advanced">Advanced</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Discount" name="discount">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Real Price" name="original_price">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Discount Price" name="discounted_price">
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Course Status"
              name="courseStatus"
              rules={[{ message: "Please select the course status!" }]}
            >
              <Select placeholder="Select Course Status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">In Active</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Summary" name="summary">
              <TextArea></TextArea>
            </Form.Item>

            <div className="flex justify-end gap-5">
              <button
                className="border px-5 py-1 border-primary !text-primary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setSelectedEditCourseData(null));
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
                  : selectedEditCourseData
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
