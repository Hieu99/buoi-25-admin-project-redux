import { Avatar, Button, Form, Input } from "antd";
import { useFormik } from "formik";
import React from "react";

const UpdateForm = ({ defaultValue }) => {
  console.log("☣️👻👻 >>> UpdateForm >>> defaultValue: ", defaultValue);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: defaultValue?.username ?? "",
      password: defaultValue?.password ?? "",
      full_name: defaultValue?.full_name ?? "",
      date_of_birth: defaultValue?.date_of_birth ?? "",
      role: defaultValue?.role ?? "",
      email: defaultValue?.email ?? "",
      avatar: defaultValue?.avatar ?? "",
    },
    onSubmit: async (value) => {
      console.log("☣️👻👻 >>> onSubmit: >>> value: ", value);
    },
  });

  return (
    <Form onSubmitCapture={formik.handleSubmit} colon={false}>
      <Form.Item label="User Mame">
        <Input
          defaultValue={formik.values.username}
          name="username"
          onChange={formik.handleChange}
          type="text"
        />
      </Form.Item>

      <Form.Item label="Password">
        <Input
          defaultValue={formik.values.password}
          name="password"
          onChange={formik.handleChange}
          type="text"
        />
      </Form.Item>

      <Form.Item label="email">
        <Input
          defaultValue={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          type="text"
        />
      </Form.Item>

      <Form.Item label="Full Name">
        <Input
          defaultValue={formik.values.full_name}
          name="full_name"
          onChange={formik.handleChange}
          type="text"
        />
      </Form.Item>

      <Form.Item label="Date Of Birth">
        <Input
          defaultValue={formik.values.date_of_birth}
          name="date_of_birth"
          onChange={formik.handleChange}
          type="text"
        />
      </Form.Item>

      <Form.Item label="Role">
        <Input
          defaultValue={formik.values.role}
          name="role"
          onChange={formik.handleChange}
          type="text"
        />
      </Form.Item>

      <Form.Item label=" ">
        <Button htmlType="submit">Update</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
