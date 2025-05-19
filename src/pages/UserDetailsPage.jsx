import React from "react";
import { useNavigate } from "react-router-dom";

const dummyUser = {
  id: 1,
  username: "john_doe",
  email: "john@example.com",
  joinedAt: "2024-11-15",
  profileImage: "https://i.pravatar.cc/150?img=3",
  purchasedCourses: [
    "React for Beginners",
    "Advanced Node.js",
    "Fullstack with MongoDB",
  ],
  purchasedSourceCodes: ["Task Manager App", "E-Commerce Template"],
};

export const UserDetailsPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        User Details
      </h1>
      <div className="text-right">
        <button className="text-blue-600 underline" onClick={()=>navigate('/admin-panel')}>Go to Back</button>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - User Info */}
        <div className="bg-white p-6 rounded-lg shadow col-span-1">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={dummyUser.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
            <div>
              <h2 className="text-xl font-semibold">{dummyUser.username}</h2>
              <p className="text-gray-600">{dummyUser.email}</p>
              <p className="text-gray-500 text-sm">
                Joined: {dummyUser.joinedAt}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Purchases */}
        <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Purchased Items</h2>

          <div className="mb-4 bg-gray-100 p-5 border border-gray-300 rounded-2xl">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Courses</h3>
        
            <ul>
              {dummyUser.purchasedCourses.map((course, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 bg-white  rounded border border-gray-100 shadow hover:bg-blue-100 cursor-pointer transition"
                >
                  <span className="text-gray-700">{course}</span>
                  <span className="text-gray-400 text-lg">&gt;</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-100 p-5 border border-gray-300 rounded-2xl">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Source Codes</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {dummyUser.purchasedSourceCodes.map((code, index) => (
                
                <li key={index} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded shadow hover:bg-blue-100 cursor-pointer transition"><span className="text-gray-700">{code}</span>
                <span className="text-gray-400 text-lg">&gt;</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
