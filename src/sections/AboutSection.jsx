import React from "react";
import { Form, Input } from "antd";

export const AboutSection = () => {
  return (
    <>
      <div className="bg-gray-50 flex flex-col p-5">
        <h1 className="text-center">About Section</h1>
        <Form layout="vertical">
          <Form.Item label="About Us" name="aboutUs">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Vission Heading" name="vissionHeading">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Vission Content" name="vissionContent">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Vission Image" name="vissionImage">
            <Input></Input>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
