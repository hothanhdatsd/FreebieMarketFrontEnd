import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  let exam = useLocation().search;
  let navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
    //dispatch
  };
  const redirect = exam ? exam.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, userInfo, redirect, navigate]);

  return (
    <FormContainer>
      <h1>Đăng ký</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="name"
            placeholder="Nhập tên "
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mật khẩu </Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Mật khẩu xác nhận </Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu xác nhận"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Đăng ký
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Đã có tài khoản ?{" "}
          <Link
            style={{ color: "#000" }}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Đăng nhập
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
