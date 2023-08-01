import React from "react";
import Alert from "react-bootstrap/Alert";
const AlertScreen = (props) => {
  const { error } = props;
  return (
    <>
      <Alert
        variant={"danger"}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: window.screen.width / 4,
          fontSize: "18px",
        }}
      >
        {error}
      </Alert>
    </>
  );
};

export default AlertScreen;
