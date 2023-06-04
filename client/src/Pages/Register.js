import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
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
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/signup",
        inputValue,
        { withCredentials: true }
      );
      toast.success(res.data.status);
      setInputValue({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>create a user</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            placeholder="name"
          />
          <input
            type="email"
            name="email"
            value={inputValue.email}
            onChange={handleChange}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            value={inputValue.password}
            onChange={handleChange}
            placeholder="password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={inputValue.confirmPassword}
            onChange={handleChange}
            placeholder="confirm password"
          />
          <button>create a user</button>
          <p className="message">
            already registered? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
