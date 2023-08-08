import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";

const DiscountEditScreen = ({ match, location }) => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    name: "",
    value: "",
    startDate: null,
    expDate: null,
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const fetchApi = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/api/discount/${id}`,
        config
      );
      setData(data);
    };
    fetchApi();
  }, [dispatch, id, userInfo.token]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `${process.env.REACT_APP_URL_API}/api/discount/${id}`,
        data,
        config
      );
      navigate("/admin/discountlist");
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Link to="/admin/discountlist" className="btn btn-light my-3">
        Trở về
      </Link>

      <FormContainer>
        <h1>Thông tin mã giảm giá</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Tên mã giảm giá</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên khuyến mãi"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Giá trị</Form.Label>
            <Form.Control
              type="number"
              placeholder="Nhập giá trị khuyến mãi"
              value={data.value}
              onChange={(e) => setData({ ...data, value: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control
              type="date"
              placeholder="Nhập ngày bắt đầu"
              value={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control
              type="date"
              placeholder="Nhập ngày kết thúc"
              value={data.expDate}
              onChange={(e) => setData({ ...data, expDate: e.target.value })}
            ></Form.Control>
          </Form.Group>
          {error && <Message variant="danger">{error}</Message>}
          <Button type="submit" variant="primary">
            Cập nhật
          </Button>
        </Form>
        {/* )} */}
      </FormContainer>
    </>
  );
};

export default DiscountEditScreen;
