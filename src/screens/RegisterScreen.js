import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import logo from "../images/logo.png";

const RegisterScreen = ({ location }) => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
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
      let trimmedStart = Email.replace(/^\s+/, ""); // Loại bỏ khoảng trắng ở đầu chuỗi
      let email = trimmedStart.replace(/\s+$/, "");
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
    // <FormContainer>
    //   <h1>Đăng ký</h1>
    //   {message && <Message variant="danger">{message}</Message>}
    //   {error && <Message variant="danger">{error}</Message>}
    //   {loading && <Loader />}
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group controlId="name">
    //       <Form.Label>Tên người dùng</Form.Label>
    //       <Form.Control
    //         type="name"
    //         placeholder="Nhập tên người dùng"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="userName">
    //       <Form.Label>Tên người dùng</Form.Label>
    //       <Form.Control
    //         type="userName"
    //         placeholder="Nhập tên tài khoản"
    //         value={userName}
    //         onChange={(e) => setUserName(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="email">
    //       <Form.Label>Email </Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="Nhập email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId="password">
    //       <Form.Label>Mật khẩu </Form.Label>
    //       <Form.Control
    //         type="password"
    //         placeholder="Nhập mật khẩu"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group controlId="confirmPassword">
    //       <Form.Label>Mật khẩu xác nhận </Form.Label>
    //       <Form.Control
    //         type="password"
    //         placeholder="Nhập mật khẩu xác nhận"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Button type="submit" variant="primary">
    //       Đăng ký
    //     </Button>
    //   </Form>
    //   <Row className="py-3">
    //     <Col>
    //       Đã có tài khoản ?{" "}
    //       <Link
    //         style={{ color: "#000" }}
    //         to={redirect ? `/login?redirect=${redirect}` : "/login"}
    //       >
    //         Đăng nhập
    //       </Link>
    //     </Col>
    //   </Row>
    // </FormContainer>

    <div className="logup">
      <div className="login-contain">
        <div className="login-top">
          <img src={logo} alt="" className="food-logo" />
          <p className=" header-login">Sign up your account</p>
        </div>
        <div className="contain-mid ">
          <form onSubmit={submitHandler}>
            <div className="contain-mid-item" id="name">
              <h5 className="contain-title">Tên người dùng</h5>
              <input
                className="input-email"
                type="text"
                placeholder="Nhập tên người dùng"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="contain-mid-item" id="email">
              <h5 className="contain-title">Email</h5>
              <input
                className="input-email"
                type="text"
                placeholder="Nhập email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="contain-mid-item" id="password">
              <h5 className="contain-title">Mật khẩu </h5>
              <input
                className="input-email"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="contain-mid-item" id="confirmPassword">
              <h5 className="contain-title">Xác nhận mật khẩu</h5>
              <input
                className="input-email"
                type="password"
                placeholder="Nhập mật khẩu xác nhận"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <div className="contain-checkbox">
              <input type="checkbox" />
              <p className="text fz18">Remember my prefence</p>
            </div>
            <button className="button" type="submit">
              Sign Me Up
            </button>
          </form>
          <div className="register text">
            <span>Already have an account? </span>
            <NavLink className={"signup"} to={"/login"}>
              Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
