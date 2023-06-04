import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token);
  const [inputValue, setInputValue] = useState({
    password: "",
    confirmPassword: "",
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
      const res = await axios.patch(
        `http://localhost:8080/api/v1/user/resetPassword/${token}`,
        inputValue,
        { withCredentials: true }
      );
      toast.success(res.data.status);
      setInputValue({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <div className="form">
      <h2>Reset password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={inputValue.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={inputValue.confirmPassword}
            onChange={handleChange}
          />
          <button>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
