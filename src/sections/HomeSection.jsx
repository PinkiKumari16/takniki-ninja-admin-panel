import { Form, Input } from "antd";
import React from "react";
const {TextArea} = Input;

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
  ];
  const abc = (values) => {
    let temUrls = (values.urls).split(',');
    values.urls = temUrls;
    console.log(values);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white">
        Welcome to Admin Panel of Takniky Ninga
      </h1>
      <div className="grid grid-col-2 md:grid-cols-3 gap-5 mt-6">
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
      <div className="bg-gray-100 mt-5 w-1/2 flex justify-center py-8">
        <Form onFinish={abc} layout="vertical"
        className="w-9/10"
        >
          <h1 className="text-center text-2xl font-semibold underline mb-3">Hero Section</h1>
          <div>
            <Form.Item name="type" label="Type">
              <Input></Input>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="urls" label="URLs">
              <TextArea row={3}/>            
              </Form.Item>
          </div>
          <div className="flex justify-end">
            <button className="px-4 bg-primary text-white py-1 rounded" type="submit"
          >Save</button>
          </div>
        </Form>
      </div>
    </>
  );
};
