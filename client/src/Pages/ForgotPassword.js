import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/forgotPassword",
        inputValue,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setInputValue({
        email: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <div className="form">
        <h2>Enter email</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={inputValue.email}
            onChange={handleChange}
          />
          <button>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
