import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyUsers = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    addTime: '2024-11-15',
    purchasedCourses: 3,
    purchasedSourceCodes: 1,
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    addTime: '2024-10-01',
    purchasedCourses: 2,
    purchasedSourceCodes: 2,
  },
  {
    id: 3,
    username: 'alex_johnson',
    email: 'alex@example.com',
    addTime: '2024-12-05',
    purchasedCourses: 5,
    purchasedSourceCodes: 3,
  },
  {
    id: 4,
    username: 'lisa_chen',
    email: 'lisa@example.com',
    addTime: '2025-01-09',
    purchasedCourses: 1,
    purchasedSourceCodes: 0,
  },
  {
    id: 5,
    username: 'michael_b',
    email: 'michael@example.com',
    addTime: '2025-02-12',
    purchasedCourses: 4,
    purchasedSourceCodes: 1,
  },
  {
    id: 6,
    username: 'emily_rose',
    email: 'emily@example.com',
    addTime: '2025-03-18',
    purchasedCourses: 6,
    purchasedSourceCodes: 4,
  },
  {
    id: 7,
    username: 'david_park',
    email: 'david@example.com',
    addTime: '2025-01-30',
    purchasedCourses: 2,
    purchasedSourceCodes: 1,
  },
  {
    id: 8,
    username: 'nina_white',
    email: 'nina@example.com',
    addTime: '2024-09-25',
    purchasedCourses: 3,
    purchasedSourceCodes: 2,
  },
  {
    id: 9,
    username: 'sahil_raj',
    email: 'sahil@example.com',
    addTime: '2025-04-01',
    purchasedCourses: 4,
    purchasedSourceCodes: 3,
  },
  {
    id: 10,
    username: 'olivia_king',
    email: 'olivia@example.com',
    addTime: '2025-05-10',
    purchasedCourses: 2,
    purchasedSourceCodes: 0,
  },
  // Add more dummy users here if testing pagination beyond page 1
];

export const AllUsersSection = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const totalPages = Math.ceil(dummyUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = dummyUsers.slice(indexOfFirstUser, indexOfLastUser);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Users
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow border border-gray-300">
          <thead>
            <tr className="bg-primary text-gray-50 text-left text-sm">
              <th className="py-3 px-4 border border-gray-300">ID</th>
              <th className="py-3 px-4 border border-gray-300">Username</th>
              <th className="py-3 px-4 border border-gray-300">Email</th>
              <th className="py-3 px-4 border border-gray-300">Add Time</th>
              <th className="py-3 px-4 border border-gray-300">Purchased Courses</th>
              <th className="py-3 px-4 border border-gray-300">Purchased Source Code</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#cfc6f0] cursor-pointer"
                onClick={() => navigate('/users/' + user.id)}
              >
                <td className="py-2 px-4 text-sm border border-gray-300">{user.id}</td>
                <td className="py-2 px-4 text-sm border border-gray-300">{user.username}</td>
                <td className="py-2 px-4 text-sm border border-gray-300">{user.email}</td>
                <td className="py-2 px-4 text-sm border border-gray-300">{user.addTime}</td>
                <td className="py-2 px-4 text-sm border border-gray-300">{user.purchasedCourses}</td>
                <td className="py-2 px-4 text-sm border border-gray-300">{user.purchasedSourceCodes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
