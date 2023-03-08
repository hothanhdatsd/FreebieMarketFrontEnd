import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  InputGroup,
  Card,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = (match, location, history) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const productId = id;
  let exam = useLocation().search;
  const qty = exam ? Number(exam.split("=")[1]) : 1;

  // console.log(qty, productId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login/?redirect=/shipping");
  };
  return (
    <div>
      <Row>
        <h1>Giỏ hàng</h1>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Giỏ hàng đang trống
              <Link to="/">Trở về</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={4}>
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>{item.price} đ</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        md={2}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            style={{ backgroundColor: "#7C88C3" }}
                            key={x + 1}
                            value={x + 1}
                          >
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button "
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Xóa
                      </Button>
                    </Col>
                  </Row>
                  <Col md={4}>
                    <Link style={{ textDecoration: "none" }} to="/">
                      Tiếp tục mua sắm
                    </Link>
                  </Col>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush" r>
              <ListGroup.Item>
                <p>Bạn có mã giảm giá? </p>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Mã giảm giá"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text
                    style={{ backgroundColor: "#0B5ED7", color: "#fff" }}
                  >
                    Sử dụng
                  </InputGroup.Text>
                </InputGroup>
                <Row>
                  <Col md={2} style={{ paddingRight: "0" }}>
                    Tổng :{" "}
                  </Col>
                  <Col md={3} style={{ paddingLeft: "0" }}>
                    {cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}{" "}
                    đ
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Thanh toán
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>{" "}
    </div>
  );
};

export default CartScreen;
