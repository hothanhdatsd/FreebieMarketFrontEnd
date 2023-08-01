import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
const CreateTypeProductScreen = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(
      `${process.env.REACT_APP_URL_API}/api/typeproducts`,
      { name, description },
      config
    );
    setName("");
    setDescription("");
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
        <h1>Thêm loại sản phẩm</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="name"
              placeholder="Nhập tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Chi tiết</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập chi tiết "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Cập nhật
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateTypeProductScreen;
