import React, { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL_API}/api/users/resetpassword`,
      {
        email,
      },
      config
    );
    console.log(data);
  };

  return (
    <>
      <FormContainer>
        <h1>Nhập email người dùng</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập tên"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Xác nhận
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ResetPassword;
