import React, { useEffect, useState } from "react";
import { Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoading,
  setReloadData,
  setSelectedEditCourseData,
  showLoading,
} from "../redux/rootSlice";
import axios from "axios";
import { Loader } from "../components/Loader";

const { TextArea } = Input;

export const CourseForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEditCourseData, loading } = useSelector(
    (state) => state.root
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  // Pre-fill form when editing
  const fetchOneCourseData = async (id) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(
        `https://abhinash.itflyweb.cloud/api/getCourseDetails.php?course_id=${id}`
      );
      if (response.data) {
        form.setFieldsValue({
          ...response.data,
        });
        setSections(response.data.sections || []);
      }
    } catch (error) {
      message.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (selectedEditCourseData) {
      fetchOneCourseData(selectedEditCourseData.id);
    }
  }, [selectedEditCourseData]);

  const addAndEditCourse = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const courseData = {
        course: {
          ...values,
          thumbnail_image: "",
        },
        sections,
      };

      formData.append("course", JSON.stringify(courseData));
      if (thumbnail) {
        formData.append("thumbnail_image", thumbnail);
      }

      const res = await axios.post(
        "https://abhinash.itflyweb.cloud/api/insert_course.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Course saved successfully!");
      dispatch(setSelectedEditCourseData(null));
      dispatch(setReloadData(true));
      navigate("/admin-panel");
    } catch (error) {
      message.error("Something went wrong!");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      dispatch(setReloadData(false));
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleLectureChange = (sectionIndex, lectureIndex, field, value) => {
    const updated = [...sections];
    updated[sectionIndex].lectures[lectureIndex][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { section_title: "", total_duration: "", lectures: [] },
    ]);
  };

  const addLecture = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].lectures.push({
      lecture_title: "",
      duration: "",
      videoUrl: "",
    });
    setSections(updated);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-center text-2xl bg-primary text-white py-2 mb-5">
            <u>{selectedEditCourseData ? "Edit Course" : "Add Course"}</u>
          </h1>

          <div className="p-6">
            <Form layout="vertical" form={form} onFinish={addAndEditCourse}>
              <Form.Item label="Course Title" name="title">
                <Input />
              </Form.Item>

              <Form.Item label="Course Thumbnail Image" name="thumbnail_image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                {selectedEditCourseData?.thumbnail_image && (
                  <img
                    src={`https://abhinash.itflyweb.cloud/api/${selectedEditCourseData.thumbnail_image}`}
                    alt="Thumbnail"
                    style={{ width: 120, marginTop: 10 }}
                  />
                )}
              </Form.Item>

              <Form.Item label="Short Description" name="description">
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item label="Course Language" name="language">
                <Select placeholder="Select Language">
                  <Select.Option value="English">English</Select.Option>
                  <Select.Option value="Spanish">Spanish</Select.Option>
                  <Select.Option value="French">French</Select.Option>
                  <Select.Option value="German">German</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Instructor" name="instructor">
                <Input />
              </Form.Item>

              <Form.Item label="Course Duration" name="duration">
                <Input />
              </Form.Item>

              <Form.Item label="Total Lectures" name="lessons">
                <Input type="number" />
              </Form.Item>

              <Form.Item label="Level" name="level">
                <Select placeholder="Select Level">
                  <Select.Option value="Beginner">Beginner</Select.Option>
                  <Select.Option value="Intermediate">
                    Intermediate
                  </Select.Option>
                  <Select.Option value="Advanced">Advanced</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Discount" name="discount">
                <Input />
              </Form.Item>

              <Form.Item label="Original Price" name="original_price">
                <Input />
              </Form.Item>

              <Form.Item label="Discounted Price" name="discounted_price">
                <Input />
              </Form.Item>

              {/* Sections & Lectures */}
              <div className="my-4">
                <h2 className="text-lg font-semibold mb-2">Sections</h2>
                <button
                  type="button"
                  onClick={addSection}
                  className="mb-4 px-6 py-2 bg-blue-500 text-white rounded"
                >
                  Add Section
                </button>

                {sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="border p-4 mb-6 rounded bg-gray-50 shadow-sm"
                  >
                    <Input
                      className="mb-2"
                      placeholder="Section Title"
                      value={section.section_title}
                      onChange={(e) =>
                        handleSectionChange(
                          sectionIndex,
                          "section_title",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      className="mb-4"
                      placeholder="Total Duration"
                      value={section.total_duration}
                      onChange={(e) =>
                        handleSectionChange(
                          sectionIndex,
                          "total_duration",
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() => addLecture(sectionIndex)}
                      className="my-3 px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Add Lecture
                    </button>

                    {section.lectures?.map((lecture, lectureIndex) => (
                      <div
                        key={lectureIndex}
                        className="border p-3 mb-3 rounded bg-white shadow-inner"
                      >
                        <Input
                          className="mb-2"
                          placeholder="Lecture Title"
                          value={lecture.lecture_title}
                          onChange={(e) =>
                            handleLectureChange(
                              sectionIndex,
                              lectureIndex,
                              "lecture_title",
                              e.target.value
                            )
                          }
                        />
                        <Input
                          className="mb-2"
                          placeholder="Duration"
                          value={lecture.duration}
                          onChange={(e) =>
                            handleLectureChange(
                              sectionIndex,
                              lectureIndex,
                              "duration",
                              e.target.value
                            )
                          }
                        />
                        <Input
                          className="mb-2"
                          placeholder="Video URL"
                          value={lecture.videoUrl}
                          onChange={(e) =>
                            handleLectureChange(
                              sectionIndex,
                              lectureIndex,
                              "videoUrl",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-5">
                <button
                  className="border px-5 py-1 border-primary text-primary rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setSelectedEditCourseData(null));
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
                    : selectedEditCourseData
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
