import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
const TypeProductEditScreen = ({ match, location }) => {
  let { id } = useParams();
  let navigate = useNavigate();
  const productId = id;
  const [error, setError] = useState(null);

  const [name, setName] = useState("");

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
        `${process.env.REACT_APP_URL_API}/api/typeproducts/${id}`,
        config
      );
      setName(data.name);
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

      await axios.post(
        `${process.env.REACT_APP_URL_API}/api/typeproducts/${id}`,
        { name },
        config
      );
      navigate("/admin/typeproductlist");
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Link to="/admin/typeproductlist" className="btn btn-light my-3">
        Trở về
      </Link>

      <FormContainer>
        <h1>Thông tin sản phẩm</h1>
        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
        {/* {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : ( */}
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

export default TypeProductEditScreen;
