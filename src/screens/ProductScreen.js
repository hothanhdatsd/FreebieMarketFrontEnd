import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
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

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Tr??? v???
      </Link>
      {loadingProductReview ? (
        <Loader />
      ) : errorProductReview ? (
        <Message variant="danger">{errorProductReview}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
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
                    <Col md={3}>Gi??:</Col>
                    <Col md={3}>
                      <strong>{product.price} ??</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={3}>Tr???ng th??i:</Col>
                    <Col md={3}>
                      {product.countInStock > 0 ? "C??n h??ng" : "H???t h??ng"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={3}>Lo???i:</Col>
                    <Col md={3}>{product.category}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ????nh gi??`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Chi ti???t: {product.description}</ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col md={3}>S??? l?????ng:</Col>
                      <Col md={3}>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
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
                          Th??m v??o gi??? h??ng
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Row>
              <Col md={6}>
                <h2>????nh gi??</h2>
                {product.reviews.length === 0 && (
                  <Message>Ch??a c?? ????nh gi??</Message>
                )}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Vi???t ????nh gi??</h2>
                    {successProductReview && (
                      <Message variant="success">????nh gi?? th??nh c??ng</Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Ch??? s???</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">L???a ch???n...</option>
                            <option value="1">1 - Th???p</option>
                            <option value="2">2 - Trung b??nh</option>
                            <option value="3">3 - T???t</option>
                            <option value="4">4 - R???t t???t</option>
                            <option value="5">5 - Tuy???t v???i</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>B??nh lu???n</Form.Label>
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
                          ????nh gi??
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        H??y <Link to="/login">????ng nh???p</Link> ????? ????nh gi??{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
