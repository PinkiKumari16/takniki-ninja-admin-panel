import React, { useState, useEffect } from "react";
import { HomeSection } from "../sections/HomeSection";
import { BlogSection } from "../sections/BlogSection";
import { SourceCodeSection } from "../sections/SourceCodeSection";
import { CourseSection } from "../sections/CourseSection";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoading,
  setActiveTab,
  setBlogData,
  setCourseData,
  setReloadData,
  showLoading,
} from "../redux/rootSlice";
import axios from "axios";
import { Loader } from "../components/Loader";
import { AllUsersSection } from "../sections/AllUsersSection";

export const Home = () => {
  const { activeTab, blogData, loading, isReloadData, courseData } =
    useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getInitialData = async () => {
    try {
      dispatch(showLoading());

      const [blogRes, courseRes] = await Promise.all([
        axios.get("https://abhinash.itflyweb.cloud/api/getBlog.php"),
        axios.get("https://abhinash.itflyweb.cloud/api/getCources.php"),
      ]);

      dispatch(setBlogData(blogRes.data.blogs));
      dispatch(setCourseData(courseRes.data.courses));
    } catch (error) {
      alert("Error fetching data: " + error.message);
    } finally {
      dispatch(hideLoading());
      dispatch(setReloadData(false));
    }
  };

  useEffect(() => {
    if (!(blogData.length && courseData.length)) {
      getInitialData();
    }
  }, [blogData, courseData]);

  useEffect(() => {
    if (isReloadData) {
      getInitialData();
    }
  }, [isReloadData]);

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeSection />;
      case "Blog":
        return <BlogSection />;
      case "Course":
        return <CourseSection />;
      case "Source Code":
        return <SourceCodeSection />;
      case "All Users":
        return <AllUsersSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex bg-sidebar-color">
          <div className="w-1/5 bg-sidebar-color text-white p-4 min-h-screen border-r border-border-color shadow-xl shadow-border-color">
            <h3 className="text-lg font-bold">Admin Panel</h3>
            <ul className="list-none py-8">
              <li
                onClick={() => dispatch(setActiveTab("Home"))}
                className={`inactiveTab ${
                  activeTab === "Home" ? "activeTab" : ""
                } transition-colors duration-300`}
              >
                Home
              </li>
              <li
                onClick={() => dispatch(setActiveTab("Blog"))}
                className={`inactiveTab ${
                  activeTab === "Blog" ? "activeTab" : ""
                } transition-colors duration-300`}
              >
                Blog
              </li>
              <li
                onClick={() => dispatch(setActiveTab("Course"))}
                className={`inactiveTab ${
                  activeTab === "Course" ? "activeTab" : ""
                } transition-colors duration-300`}
              >
                Course
              </li>
              <li
                onClick={() => dispatch(setActiveTab("Source Code"))}
                className={`inactiveTab ${
                  activeTab === "Source Code" ? "activeTab" : ""
                } transition-colors duration-300`}
              >
                Source Code
              </li>
              <li
                onClick={() => dispatch(setActiveTab("All Users"))}
                className={`inactiveTab ${
                  activeTab === "All Users" ? "activeTab" : ""
                } transition-colors duration-300`}
              >
                All Users
              </li>
            </ul>
          </div>
          <div className="p-4 flex-1">{renderContent()}</div>
        </div>
      )}
    </>
  );
};
