import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
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
        "http://localhost:8080/api/v1/user/login",
        inputValue,
        { withCredentials: true }
      );
      toast.success(res.data.status);
      setInputValue({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              onChange={handleChange}
              name="email"
              value={inputValue.email}
            />
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={inputValue.password}
            />
            <button>login</button>
            <p className="message">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
            <p className="message">
              <Link to="/forgotPassword">Forgot Password ? </Link>
            </p>
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Login;
