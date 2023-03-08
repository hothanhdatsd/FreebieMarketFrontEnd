import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Message.default_props = {
  variant: "info",
};
export default Message;
