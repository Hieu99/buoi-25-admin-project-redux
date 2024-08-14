import React, { useEffect } from "react";
import { message as _message } from "antd";
import { useSelector } from "react-redux";

const MessageProvider = (props) => {
  const { message, status, logs } = useSelector((store) => store.alert);

  const messageOption = {
    success: _message.success,
    info: _message.info,
    warning: _message.warning,
    error: _message.error,
  };

  useEffect(() => {
    if (message != "N/A") {
      messageOption[status](message, 0.8);
    }
  }, [logs]);

  return <>{props.children}</>;
};

export default MessageProvider;
