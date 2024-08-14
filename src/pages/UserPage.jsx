import React, { useEffect, useState } from "react";
import useHelmet from "../hooks/useHelmet";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkFetchListUser,
  thunkFetchUserDetail,
} from "../store/asyncThunk/userThunk";
import { Avatar, Button, Flex, Modal, Spin, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { MESSAGE_STATUS, setAlertMessage } from "../store/app/alertSlice";
import UserRequester from "../service/userRequester";
import { setUserPageLoading, setUserDetail } from "../store/common/userSlice";
import UpdateForm from "../component/user/UpdateForm";

const UserPage = () => {
  useHelmet("App - User");
  const dispatch = useDispatch();
  const { loading, listUser, userDetail } = useSelector(
    (store) => store.common.user
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const promise = dispatch(thunkFetchListUser());

    return () => {
      promise.abort();
    };
  }, []);

  const handleDelete = async (id) => {
    dispatch(setUserPageLoading(true));
    try {
      const res = await UserRequester.deleteUser(id);
      if (res.status === 200) {
        dispatch(thunkFetchListUser());
        dispatch(
          setAlertMessage({
            message: "delete successfully",
            status: MESSAGE_STATUS.success,
          })
        );
      }
    } catch (err) {
      dispatch(
        setAlertMessage({
          message: err.response.data,
          status: MESSAGE_STATUS.error,
        })
      );
    } finally {
      dispatch(setUserPageLoading(false));
    }
  };

  const handleFetchUserDetail = (id) => {
    dispatch(thunkFetchUserDetail({ id, setOpenModal }));
  };

  const column = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render(ele, data) {
        return <Avatar key={data.id} src={ele} size={"large"} />;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Ful Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Date Of Birth",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "action",
      render(id) {
        return (
          <Flex key={id} gap={4} align="center">
            <Button
              onClick={() => handleDelete(id)}
              danger
              icon={<DeleteOutlined />}
            />
            <Button
              onClick={() => handleFetchUserDetail(id)}
              icon={<EditOutlined />}
            />
          </Flex>
        );
      },
    },
  ];
  const dataSource = listUser.map((ele) => ({
    key: ele.id,
    userName: ele.username,
    fullName: ele.full_name,
    email: ele.email,
    dateOfBirth: ele.date_of_birth,
    role: ele.role,
    avatar: ele.avatar,
  }));

  return (
    <div className="overflow-y-scroll h-full">
      <Spin spinning={loading}>
        <Table columns={column} dataSource={dataSource}></Table>
      </Spin>
      <Modal
        className="pt-6"
        title="Update User"
        children={<UpdateForm defaultValue={userDetail ?? undefined} />}
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          dispatch(setUserDetail(null));
        }}
        footer={[]}
      />
    </div>
  );
};

export default UserPage;
