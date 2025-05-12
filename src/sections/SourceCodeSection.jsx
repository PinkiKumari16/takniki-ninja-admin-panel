import React from "react";
import { SourceCodeCard } from "../components/SourceCodeCard";
import { Tooltip } from "antd";

const sourceCode = [
  {
    title: "Introduction to JavaScript",
    appId: "js101",
    shortDescription: "Learn the basics of JavaScript.",
    longDescription:
      "A comprehensive course covering the fundamentals of JavaScript, including syntax, variables, functions, and events.",
    thumbnail:
      "https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=",
    trailer: "url/to/js_trailer.mp4",
    script: "url/to/js_script.js",
    faq: "Frequently asked questions about this course.",
    reviews: [
      { user: "Alice", comment: "Great course!" },
      { user: "Bob", comment: "Loved the practical examples." },
    ],
    termsAndCondition: "Standard terms apply.",
    price: "$99",
    totalSell: 150,
    totalReview: 25,
    appIcon: "https://example.com/icon1.png",
    appUrl: "https://example.com/js_course",
    zipUrl: "https://example.com/js_course.zip",
  },
  {
    title: "Mastering Python",
    appId: "py202",
    shortDescription: "Become a Python expert!",
    longDescription:
      "This course teaches you everything you need to know about Python programming, from basic concepts to advanced techniques.",
    thumbnail:
      "https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=",
    trailer: "url/to/py_trailer.mp4",
    script: "url/to/py_script.py",
    faq: "Frequently asked questions about this course.",
    reviews: [
      { user: "Charlie", comment: "In-depth and informative." },
      { user: "Daisy", comment: "Very engaging." },
    ],
    termsAndCondition: "Standard terms apply.",
    price: "$129",
    totalSell: 200,
    totalReview: 30,
    appIcon: "https://example.com/icon2.png",
    appUrl: "https://example.com/py_course",
    zipUrl: "https://example.com/py_course.zip",
  },
  {
    title: "Understanding CSS",
    appId: "css303",
    shortDescription: "Enhance your web design skills with CSS.",
    longDescription:
      "Explore the world of CSS and learn how to style web pages effectively using various CSS properties.",
    thumbnail:
      "https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=",
    trailer: "url/to/css_trailer.mp4",
    script: "url/to/css_script.css",
    faq: "Frequently asked questions about this course.",
    reviews: [
      { user: "Eve", comment: "Loved the style tips!" },
      { user: "Frank", comment: "Great introductory course." },
    ],
    termsAndCondition: "Standard terms apply.",
    price: "$79",
    totalSell: 100,
    totalReview: 15,
    appIcon: "https://example.com/icon3.png",
    appUrl: "https://example.com/css_course",
    zipUrl: "https://example.com/css_course.zip",
  },
  {
    title: "React for Beginners",
    appId: "react404",
    shortDescription: "Start your journey in React development.",
    longDescription:
      "An introductory course to React, focusing on components, props, state, and lifecycle methods to build dynamic web applications.",
    thumbnail:
      "https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?s=612x612&w=0&k=20&c=7SScR_Y4n7U3k5kBviYm3VwEmW4vmbngDUa0we429GA=",
    trailer: "url/to/react_trailer.mp4",
    script: "url/to/react_script.js",
    faq: "Frequently asked questions about this course.",
    reviews: [
      { user: "Grace", comment: "Very informative and well-structured." },
      { user: "Hank", comment: "Helped me understand React!" },
    ],
    termsAndCondition: "Standard terms apply.",
    price: "$99",
    totalSell: 180,
    totalReview: 40,
    appIcon: "https://example.com/icon4.png",
    appUrl: "https://example.com/react_course",
    zipUrl: "https://example.com/react_course.zip",
  },
];

export const SourceCodeSection = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-white text-center">Source Code</h1>
      <hr className="mt-2 mb-2 border border-border-color" />
      <div className="text-right">
        <Tooltip title="Add the new source code" placement="top" color="gray">
          <button className="px-6 bg-primary border border-border-color rounded text-white mt-1 py-1">
            <span className="block lg:hidden text-2xl font-bold">+</span>
            <span className="hidden lg:block">Add New Source Code</span>
          </button>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {sourceCode.map((item, index) => (
          <SourceCodeCard key={index} item={item} />
        ))}
      </div>
    </>
  );
};
