import React from "react";

export const Loader = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center fixed inset-0  bg-primary z-[10000]">
        <div className="flex gap-5 text-4xl md:text-6xl font-semibold">
          <h1 className="text-orange-500 takniki">Takniki</h1>
          <h1 className="text-white ninja">Ninja</h1>
          <h1 className="text-green-600 web">Web</h1>
        </div>
      </div>
    </>
  );
};
