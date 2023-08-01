import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";
import { detailTypeProduct } from "../actions/typeProductActions.js";
const TypeProductEditScreen = ({ match, location }) => {
  let { id } = useParams();
  console.log(id);
  let navigate = useNavigate();
  const productId = id;

  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (successUpdate) {
  //       dispatch({ type: PRODUCT_UPDATE_RESET });
  //       navigate("/admin/productlist");
  //     } else {
  //       if (!product.name || product._id !== productId) {
  //         dispatch(listProductDetails(productId));
  //       } else {
  //         setName(product.name);
  //         setPrice(product.price);
  //         setImage(product.image);
  //         setCategory(product.category);
  //         setCountInStock(product.countInStock);
  //         setDescription(product.description);
  //       }
  //     }
  //   }, [navigate, dispatch, product, productId, successUpdate]);
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
      setDescription(data.description);
    };
    fetchApi();
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        description,
      })
    );
  };
  console.log(data);
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
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
        {/* )} */}
      </FormContainer>
    </>
  );
};

export default TypeProductEditScreen;
