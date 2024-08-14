import { useFormik } from "formik";
import React from "react";
import UploadImage from "../component/UploadImage";
import * as yup from "yup";
import useHelmet from "../hooks/useHelmet";
import UserRequester from "../service/userRequester";
import { useDispatch } from "react-redux";
import { MESSAGE_STATUS, setAlertMessage } from "../store/app/alertSlice";
import { setIsAuth } from "../store/app/authSlice";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useHelmet("App - SignUp");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      full_name: "",
      date_of_birth: "",
      avatar: "",
      role: "user",
    },
    validationSchema: yup.object({
      username: yup.string().required("user name is requier!"),
      password: yup.string().required("password is requier!"),
      email: yup.string().email("invalid email").required("email is requier!"),
      full_name: yup.string().required("full name  is requier!"),
      date_of_birth: yup.string().required("date of birth is requier!"),
      avatar: yup.string().required("avatar is requier!"),
    }),
    onSubmit: async (value) => {
      try {
        const res = await UserRequester.signup(value);
        if (res.status == 201) {
          dispatch(
            setAlertMessage({
              message: "register successfully",
              status: MESSAGE_STATUS.success,
            })
          );
          dispatch(setIsAuth(res.data));
          navigate("/");
        }
      } catch (err) {
        dispatch(
          setAlertMessage({
            message: err.response.data,
            status: MESSAGE_STATUS.error,
          })
        );
        console.log(err);
      }
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border border-solid border-gray-200 shadow-md rounded-lg px-8 py-6 w-2/6">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Register
        </h1>
        <form onSubmit={formik.handleSubmit} action="#">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User name
            </label>
            <input
              name="username"
              onChange={formik.handleChange}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="User name"
            />
            {formik.errors.username && formik.touched.username && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.username}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              name="password"
              onChange={formik.handleChange}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
            {formik.errors.password && formik.touched.password && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              name="email"
              onChange={formik.handleChange}
              type="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full name
            </label>
            <input
              name="full_name"
              onChange={formik.handleChange}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Full name"
            />
            {formik.errors.full_name && formik.touched.full_name && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.full_name}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date of birth
            </label>
            <input
              name="date_of_birth"
              onChange={formik.handleChange}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Date of birth"
            />
            {formik.errors.date_of_birth && formik.touched.date_of_birth && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.date_of_birth}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Avatar
            </label>
            <UploadImage
              handleChange={(imageURL) => {
                formik.setFieldValue("avatar", imageURL);
                return {};
              }}
            />
            {formik.errors.avatar && formik.touched.avatar && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.avatar}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singup;
