import React from "react";

export const HomeSection = ({ blogLength }) => {
  const totalData = [
    {
      title: "Course Details",
      "Total Courses": "120+",
      "Sold Courses": "50+",
      "Prime Courses": "20",
      Revenue: "$10,000",
    },
    {
      title: "Blog Details",
      "Total Blogs": `${blogLength}+`,
      "Published Blogs": "70+",
      Rating: "3*",
      Revenue: "$15,000",
    },
    {
      title: "Source Code Details",
      "Total Codes": "200+",
      "Sold Codes": "100+",
      "Prime Codes": "50",
      Revenue: "$25,000",
    },
    {
      title: "Post Details",
      "Total Posts": "250+",
      "Published Posts": "120+",
      "Prime Posts": "80",
      Revenue: "$40,000",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white">
        Welcome to Admin Panel of Takniky Ninga
      </h1>
      <div className="grid grid-col-1 md:grid-cols-2 gap-5 mt-6">
        {totalData.map((data, index) => {
          const { title, ...details } = data;

          return (
            <div
              key={index}
              className="border-2 border-border-color rounded p-4 shadow-md"
            >
              <h2 className="text-lg font-bold mb-2 text-center text-gray">
                {title}
              </h2>
              {Object.entries(details).map(([key, value]) => (
                <div className="flex justify-around mb-2" key={key}>
                  <span className="text-gray-600">{key}: </span>
                  <span className="text-2xl font-bold text-blue-500">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};
