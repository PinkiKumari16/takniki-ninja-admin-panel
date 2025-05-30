import React, { useEffect, useState } from "react";
import { Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoading,
  setReloadData,
  setSelectedEditSourceData,
  showLoading,
} from "../redux/rootSlice";
import axios from "axios";
import { Loader } from "../components/Loader";

const { TextArea } = Input;

export const SourceCodeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEditSourceData, loading } = useSelector(
    (state) => state.root
  );
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch course details when editing
//   const fetchOneCourseData = async (id) => {
//     dispatch(showLoading());
//     try {
//       const response = await axios.get(
//         `https://abhinash.itflyweb.cloud/api/getCourseDetails.php?course_id=${id}`
//       );
//       if (response.data) {
//         console.log(response.data);
//         form.setFieldsValue({ ...response.data });
//         console.log(selectedEditCourseData);
//         setSections(response.data.sections || []);
//         setThumbnail(response.data.thumbnail);
//       }
//     } catch (error) {
//       message.error("Failed to fetch course details.");
//     } finally {
//       dispatch(hideLoading());
//     }
//   };

  const addAndEditSource = async (values) => {
    setIsSubmitting(true);
    console.log(values);
    // try {
    //   const formData = new FormData();

    //   const courseData = {
    //     ...values,
    //     thumbnail_image: "",
    //   };
    //   const payload = {
    //     course: courseData,
    //     sections: sections,
    //   };
    //   formData.append("course", JSON.stringify(payload));

    //   if (thumbnail) {
    //     formData.append("thumbnail_image", thumbnail);
    //   }

    //   let res;
    //   if (selectedEditCourseData) {
    //     formData.append("course_id", selectedEditCourseData.id);
    //     res = await axios.post(
    //       "https://abhinash.itflyweb.cloud/api/editCourse.php",
    //       formData,
    //       {
    //         headers: { "Content-Type": "multipart/form-data" },
    //       }
    //     );
    //   } else {
    //     console.log("add the data................");
    //     res = await axios.post(
    //       "https://abhinash.itflyweb.cloud/api/insert_course.php",
    //       formData,
    //       {
    //         headers: { "Content-Type": "multipart/form-data" },
    //       }
    //     );
    //   }
    //   S;

    //   if (res.data?.course_id || res.data?.success) {
    //     message.success(res.data.message || "Operation successful");
    //     dispatch(setSelectedEditCourseData(null));
    //     dispatch(setReloadData(true));
    //     navigate("/admin-panel");
    //   } else {
    //     message.warning(res.data.message || "Operation failed.");
    //   }
    // } catch (error) {
    //   console.error("Error during course submission:", error);
    //   message.error("Something went wrong!");
    // } finally {
    //   setIsSubmitting(false);
    //   dispatch(setReloadData(false));
    // }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-center text-2xl bg-primary text-white py-2 mb-5">
            <u>
              {selectedEditSourceData ? "Edit Source Code" : "Add Source Code"}
            </u>
          </h1>

          <div className="p-6">
            <Form layout="vertical" onFinish={addAndEditSource}>
              <Form.Item label="Product Name" name="title">
                <Input />
              </Form.Item>

              <Form.Item label="Product Thumbnail Image" name="thumbnail_image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                {selectedEditSourceData?.thumbnail_image && (
                  <img
                    src={`https://abhinash.itflyweb.cloud/api/${selectedEditSourceData.thumbnail_image}`}
                    alt="Thumbnail"
                    style={{ width: 120, marginTop: 10 }}
                  />
                )}
              </Form.Item>

              <Form.Item label="Description" name="description">
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item label="Instructor" name="instructor">
                <Input value="Pinki Kumari" />
              </Form.Item>
         
              <Form.Item label="Rating" name="rating">
                <Select placeholder="Select Rating">
                  <Select.Option value="★★★★★">★★★★★</Select.Option>
                  <Select.Option value="★★★★☆">★★★★☆</Select.Option>
                  <Select.Option value="★★★☆☆">★★★☆☆</Select.Option>
                  <Select.Option value="★★☆☆☆">★★☆☆☆</Select.Option>
                  <Select.Option value="★☆☆☆☆">★☆☆☆☆</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Price" name="price">
                <Input />
              </Form.Item>

              <Form.Item label="Problems" name="problems">
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Solutions" name="solutions">
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item label="What It Does" name="whatItDoes">
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Features" name="features">
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Benefits" name="benefits">
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Related Items" name="relatedItems">
                <Input />
              </Form.Item>
              <Form.Item label="Technologies" name="technologies">
                <Input />
              </Form.Item>

              <div className="flex justify-end gap-5">
                <button
                  className="border px-5 py-1 border-primary text-primary rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setSelectedEditSourceData(null));
                    navigate("/admin-panel");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-white px-5 py-1 rounded"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : selectedEditSourceData
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
