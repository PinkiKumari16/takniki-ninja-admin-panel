import React from "react";

export const SourceCodeCard = ({ item }) => {
  return (
    <>
      <div className="border border-border-color rounded p-4 bg-sidebar-color shadow-md">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-32 object-cover rounded mb-2"
        />
        <h2 className="text-lg font-bold mb-2 text-center text-white">
          {item.title}
        </h2>
        <p className="text-gray-600 mb-2">{item.longDescription}</p>
        <div className="flex gap-5 justify-end">
          <button className="py-1 px-3 bg-gray border border-secondary rounded text-white">
            Delete
          </button>
          <button className="py-1 px-3 bg-primary border border-border-color rounded text-white">
            Edit
          </button>
        </div>
      </div>
    </>
  );
};
