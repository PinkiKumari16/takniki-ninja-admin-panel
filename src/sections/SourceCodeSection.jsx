import React from "react";
import { SourceCodeCard } from "../components/SourceCodeCard";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const sourceCodeData = [
  {
    image:
      "https://a.storyblok.com/f/122804/1600x1000/d8bafe91e5/system-software.webp",
    title: "Whats ChatBot Pro - send automatically...",
    author: "bhansalisoft",
    platform: "Windows",
    originalPrice: 49,
    discountedPrice: 44,
    sales: 3,
    ratings: 0,
    reviews: 0,
    isDiscounted: true,
    id: 1,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxx63qKZN1chY88OMkQF1_cW-tVTGJpQFXg&s",
    title: "Google Maps Advance Business Extractor",
    author: "bhansalisoft",
    platform: "Windows",
    originalPrice: 15,
    discountedPrice: 13,
    sales: 397,
    ratings: 4,
    reviews: 38,
    isDiscounted: true,
    id: 2,
  },
  // Add more items as needed
];

export const SourceCodeSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold text-white text-center">Source Code</h1>
      <hr className="mt-2 mb-2 border border-border-color" />
      <div className="text-right">
        <Tooltip title="Add the new source code" placement="top" color="gray">
          <button className="px-6 bg-primary border border-border-color rounded text-white mt-1 py-1"
          onClick={()=>navigate('/source-form')}
          >
            <span className="block lg:hidden text-2xl font-bold">+</span>
            <span className="hidden lg:block">Add New Source Code</span>
          </button>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {sourceCodeData.map((sourseCode) => (
          <SourceCodeCard key={sourseCode.id} sourseCode={sourseCode} />
        ))}
      </div>
    </>
  );
};
