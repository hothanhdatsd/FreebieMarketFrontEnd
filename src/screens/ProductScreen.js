import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import "../index.css";

import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  let navigate = useNavigate();

  let { id } = useParams();
  let productid = id;
  // const product = Products.find((p) => p._id === id);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== productid) {
      dispatch(listProductDetails(productid));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, successProductReview, productid, product._id]);

  const addToCartHandler = () => {
    navigate(`/cart/${productid}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productid, {
        rating,
        comment,
      })
    );
  };
  let VND = new Intl.NumberFormat("en-US", {
    currency: "VND",
    style: "currency",
  });

  return (
    <>
      <Link className="btn btn-light my-3" to="/" style={{ margin: "0 20px" }}>
        Trở về
      </Link>
      {loadingProductReview ? (
        <Loader />
      ) : errorProductReview ? (
        <Message variant="danger">{errorProductReview}</Message>
      ) : (
        <Row style={{ width: "100%", padding: "0  20px" }}>
          <Meta title={product.name} />
          <Row collapseonselect="true">
            <Col md={6}>
              <Image
                style={{
                  width: "623px",
                  height: "355px",
                  objectFit: "cover",
                  marginTop: "35px",
                }}
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={3}>Giá:</Col>
                    <Col md={3}>
                      <strong>{VND.format(product.price)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={3}>Trạng thái:</Col>
                    <Col md={3}>
                      {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} đánh giá`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Chi tiết: {product.description}</ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col md={3}>Số lượng:</Col>
                      <Col md={3}>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()]?.map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={6}>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Thêm vào giỏ hàng
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Row>
              <Col md={6}>
                <h2>Đánh giá</h2>
                {product.reviews.length === 0 && (
                  <Message>Chưa có đánh giá</Message>
                )}
                <ListGroup variant="flush">
                  {product.reviews?.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Viết đánh giá</h2>
                    {successProductReview && (
                      <Message variant="success">Đánh giá thành công</Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Chỉ số</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Lựa chọn...</option>
                            <option value="1">1 - Thấp</option>
                            <option value="2">2 - Trung bình</option>
                            <option value="3">3 - Tốt</option>
                            <option value="4">4 - Rất tốt</option>
                            <option value="5">5 - Tuyệt vời</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Bình luận</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Đánh giá
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Hãy <Link to="/login">Đăng nhập</Link> để đánh giá{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Row>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
