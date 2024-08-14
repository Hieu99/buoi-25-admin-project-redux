import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useHelmet from "../hooks/useHelmet";
import { useFormik } from "formik";
import * as yup from "yup";
import UserRequester from "../service/userRequester";
import { useDispatch } from "react-redux";
import { MESSAGE_STATUS, setAlertMessage } from "../store/app/alertSlice";
import { setIsAuth } from "../store/app/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useHelmet("App - Login");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("user name is required"),
      password: yup.string().required("password is required"),
    }),
    onSubmit: async (value) => {
      try {
        const res = await UserRequester.listUser();

        if (res.status === 200 && Array.isArray(res.data)) {
          const findUser = res.data.find(
            (ele) => ele.username === value.username
          );

          if (!findUser) {
            dispatch(
              setAlertMessage({
                message: "User name is incorrect!",
                status: MESSAGE_STATUS.error,
              })
            );
          } else if (findUser.password.includes(value.password)) {
            dispatch(setIsAuth(findUser));
            dispatch(
              setAlertMessage({
                message: "Login successfully.",
                status: MESSAGE_STATUS.success,
              })
            );
            navigate("/");
          } else {
            dispatch(
              setAlertMessage({
                message: "Password is incorrect!",
                status: MESSAGE_STATUS.error,
              })
            );
          }
        } else {
          throw new Error("Invalid response data");
        }
      } catch (err) {
        dispatch(
          setAlertMessage({
            message: "login error",
            status: MESSAGE_STATUS.error,
          })
        );
      }
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border border-solid border-gray-200 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Welcome Back!
        </h1>
        <form onSubmit={formik.handleSubmit} action="#">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              User name
            </label>
            <input
              name="username"
              type="text"
              onChange={formik.handleChange}
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="input your user name"
              required
            />
            {formik.errors.username && formik.touched.username && (
              <span className="text-[12px] text-red-500">
                {formik.errors.username}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
            {formik.errors.password && formik.touched.password && (
              <span className="text-[12px] text-red-500">
                {formik.errors.password}
              </span>
            )}
            <Link
              to="#"
              className="text-xs block text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                defaultChecked
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/signup"
              className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
