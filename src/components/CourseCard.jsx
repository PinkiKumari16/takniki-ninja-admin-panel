import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedEditCourseData } from "../redux/rootSlice";
import { useNavigate } from "react-router-dom";

export const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md shadow-border-color border border-border-color rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={`https://abhinash.itflyweb.cloud/api/${course.thumbnail_image}`}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {course.discount}% OFF
        </span>
      </div>

      {/* Course Details */}
      <div className="p-5 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>

        <div className="flex flex-wrap items-center text-sm text-gray-700 gap-2">
          <span>👨‍🏫 By {course.instructor || "Instructor"}</span>
          <span>🔍 {course.level || "All Levels"}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700 gap-4">
          <span>⏰ {course.duration || "4 weeks"}</span>
          <span>🎓 {course.lessons || "12"} Lessons</span>
        </div>

        <div className="text-md font-semibold text-blue-600">
          ${course.discounted_price || course.original_price}
          <span className="ml-2 text-sm text-gray-500 line-through">
            ${course.original_price}
          </span>
        </div>

        <div className="flex gap-5 justify-end">
          <button className="p-1 px-3 bg-red-500 text-white">Delete</button>
          <button
            className="p-1 px-3 bg-primary border border-border-color text-white"
            onClick={() => {
              // getSelectedBlogData(blog.id);
              dispatch(setSelectedEditCourseData(course));
              navigate("/course-form");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
