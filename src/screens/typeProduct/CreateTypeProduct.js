import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
const CreateTypeProductScreen = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
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
        `${process.env.REACT_APP_URL_API}/api/typeproducts`,
        { name },
        config
      );
      setName("");
      setError(null); // Reset the form input
      navigate("/admin/typeproductlist");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value.trim());
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
              type="text"
              placeholder="Nhập tên"
              onChange={handleNameChange}
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

export default CreateTypeProductScreen;
