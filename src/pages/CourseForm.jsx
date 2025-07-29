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

  // Fetch course details when editing
  const fetchOneCourseData = async (id) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(
        `https://abhinash.itflyweb.cloud/api/getCourseDetails.php?course_id=${id}`
      );
      if (response.data) {
        // console.log(response.data);
        form.setFieldsValue({ ...response.data });
        // console.log(selectedEditCourseData);
        setSections(response.data.sections || []);
        setThumbnail(response.data.thumbnail)
      }
    } catch (error) {
      message.error("Failed to fetch course details.");
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
        ...values,
        thumbnail_image: "", 
      };
      const payload = {
        course: courseData,
        sections: sections,
      };
      formData.append("course", JSON.stringify(payload));

      if (thumbnail) {
        formData.append("thumbnail_image", thumbnail);
      }

      let res;
      if (selectedEditCourseData) {
        console.log(selectedEditCourseData);
        console.log("editing course.................");
        formData.append("course_id", selectedEditCourseData.id);
        
        res = await axios.post(
          "https://abhinash.itflyweb.cloud/api/editCourse.php",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        console.log("add the data................");
        res = await axios.post(
          "https://abhinash.itflyweb.cloud/api/insert_course.php",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      console.log(res.data);
      if (res.data?.course_id || res.data?.success) {
        message.success(res.data.message || "Operation successful");
        dispatch(setSelectedEditCourseData(null));
        dispatch(setReloadData(true));
        navigate("/admin-panel");
      } else {
        message.warning(res.data.message || "Operation failed.");
      }
    } catch (error) {
      console.error("Error during course submission:", error);
      message.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
      dispatch(setReloadData(false));
    }
  };

  // Section & lecture logic
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
                        className="border p-4 mb-4 rounded bg-white shadow-sm relative"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium">
                              Lecture Title
                            </label>
                            <Input
                              placeholder="e.g., Introduction to React"
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
                          </div>

                          <div>
                            <label className="text-sm font-medium">
                              Duration
                            </label>
                            <Input
                              placeholder="e.g., 5:30"
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
                          </div>

                          <div>
                            <label className="text-sm font-medium">
                              Video URL
                            </label>
                            <Input
                              placeholder="e.g., https://youtube.com/..."
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
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updatedSections = [...sections];
                            updatedSections[sectionIndex].lectures.splice(
                              lectureIndex,
                              1
                            );
                            setSections(updatedSections);
                          }}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
                        >
                          ❌
                        </button>
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
