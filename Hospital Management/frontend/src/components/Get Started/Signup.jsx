import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const Signup = ({ toggle }) => {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    gender: "Male",
    contact: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.email ||
      !form.name ||
      !form.password ||
      !form.gender ||
      !form.contact
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        form,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      toggle();
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to sign up. Try again."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Create Your Account
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2 text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={form.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={form.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <input
          type="tel"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <button
          onClick={toggle}
          className="text-blue-600 hover:underline font-medium"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
