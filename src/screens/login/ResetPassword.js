import React, { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";

const ResetPassword = () => {
  const [name, setName] = useState("");

  return (
    <>
      <FormContainer>
        <h1>Nhập email người dùng</h1>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="name"
              placeholder="Nhập tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
