import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mobileNumber, password);
    // localStorage.setItem("mobileNumber", mobileNumber);
    // localStorage.setItem("password", password);

    navigate("/admin-panel");
  };

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center">
      <div className="container px-4 py-8 bg-white shadow-lg shadow-white rounded-lg w-9/10 md:w-2/4 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-screen"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
