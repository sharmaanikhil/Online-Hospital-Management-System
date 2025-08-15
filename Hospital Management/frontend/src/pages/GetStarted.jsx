import React, { useState } from "react";
import Login from "../components/Get Started/Login";
import Signup from "../components/Get Started/Signup.jsx";

const GetStarted = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        {isLogin ? (
          <Login toggle={() => setIsLogin(false)} />
        ) : (
          <Signup toggle={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default GetStarted;
