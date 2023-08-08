import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
const CreateDiscountScreen = () => {
  let navigate = useNavigate();

  const [params, setParams] = useState({
    name: "",
    value: "",
    startDate: null,
    expDate: null,
  });
  const [error, setError] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_URL_API}/api/discount`,
        params,
        config
      );
      navigate("/admin/discountlist");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!!userInfo) {
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  return (
    <>
      <Link to="/admin/typeproductlist" className="btn btn-light my-3">
        Trở về
      </Link>

      <FormContainer>
        <h1>Thêm mã giảm giá</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên"
              onChange={(e) => {
                setParams({ ...params, name: e.target.value });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Giá trị</Form.Label>
            <Form.Control
              type="number"
              placeholder="Nhập giá trị khuyến mãi"
              onChange={(e) => {
                setParams({ ...params, value: e.target.value });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control
              type="date"
              timezone=" UTC+7"
              onChange={(e) => {
                setParams({
                  ...params,
                  startDate: e.target.value,
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => {
                setParams({
                  ...params,
                  expDate: e.target.value,
                });
              }}
            ></Form.Control>
          </Form.Group>
          {error && <Message variant="danger">{error}</Message>}
          <Button type="submit" variant="primary">
            Cập nhật
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateDiscountScreen;
