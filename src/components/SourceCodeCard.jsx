import React from "react";

export const SourceCodeCard = ({ sourseCode }) => {
  if (!sourseCode) return null;

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={sourseCode.image}
          alt={sourseCode.title}
          className="w-full h-40 object-cover"
        />
        {sourseCode.isDiscounted && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Offer
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {sourseCode.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          by <span className="text-blue-600">{sourseCode.author}</span> in{" "}
          {sourseCode.platform}
        </p>
        <div className="flex items-center gap-2 text-sm mb-1">
          <span className="line-through text-gray-400">
            ${sourseCode.originalPrice}
          </span>
          <span className="text-green-600 font-semibold">
            ${sourseCode.discountedPrice}
          </span>
        </div>

        {sourseCode.ratings > 0 && (
          <div className="flex items-center text-sm text-yellow-500 mb-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>{index < sourseCode.ratings ? "⭐" : "☆"}</span>
            ))}
            <span className="ml-2 text-gray-500 text-xs">
              ({sourseCode.reviews})
            </span>
          </div>
        )}

        <p className="text-xs text-gray-600">{sourseCode.sales} Sales</p>
        <div className="flex gap-5 justify-end">
          <button className="p-1 px-3 bg-red-500 text-white">Delete</button>
          <button
            className="p-1 px-3 bg-primary border border-border-color text-white"
            onClick={() => {
              
              // navigate("/blog-form");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
