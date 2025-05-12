import React, { useState } from "react";
import { CourseCard } from "../components/CourseCard";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CourseSection = () => {
  const { courseData } = useSelector((state) => state.root);
  const navigate = useNavigate();
  // const [isCourseFormShow, setCourseFormShow] = useState(false);
  // const [seletedEditData, setSeletedEditData] = useState(null);

  // const addAndEditCourse = () => {
  //   console.log("form submmit...............");
  // };
  return (
    <>
      <h1 className="text-3xl font-bold text-white text-center">Courses</h1>
      <hr className="mt-2 mb-2 border border-border-color" />
      <div className="text-right">
        <Tooltip title="Add the new course" placement="top" color="gray">
          <button
            className="px-6 bg-primary border border-border-color rounded text-white mt-1 py-1"
            onClick={() => navigate("/course-form")}
          >
            <span className="block md:hidden text-2xl font-bold">+</span>
            <span className="hidden md:block">Add New Course</span>
          </button>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {courseData.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            // setCourseFormShow={setCourseFormShow}
            // setSeletedEditData={setSeletedEditData}
          />
        ))}
      </div>
    </>
  );
};
