import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
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
import { addToCart, removeFromCart } from "../../actions/cartActions";
import axios from "axios";
import { saveDiscount } from "../../actions/cartActions.js";

const CartScreen = (match, location, history) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const productId = id;
  let exam = useLocation().search;
  const qty = exam ? Number(exam.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  let VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  });

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const AppplyDiscount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/api/discount/value/${name}`,
        config
      );
      setError(null);
      setData(data);
      setName("");
      dispatch(saveDiscount(data?.value));
      sessionStorage.setItem(
        "discount",
        JSON.stringify({
          name: data?.name,
          value: data?.value,
        })
      );
    } catch (error) {
      setData(null);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const checkOutHandler = () => {
    navigate("/login/?redirect=/shipping");
  };
  return (
    <div style={{ minHeight: "57%" }}>
      <Row style={{ width: "100%", padding: "0 20px" }}>
        <h1>Giỏ hàng</h1>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Giỏ hàng đang trống
              <Link to="/">Trở về</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              <Col md={4}>
                <Link style={{ textDecoration: "none" }} to="/">
                  Tiếp tục mua sắm
                </Link>
              </Col>
              {cartItems?.map((item) => (
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
                    <Col md={2}>{VND.format(item.price)} đ</Col>
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
                        {[...Array(item.countInStock).keys()]?.map((x) => (
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
                    onChange={(e) => {
                      setName(e.target.value.trim());
                    }}
                    value={name}
                  />
                  <Button
                    onClick={AppplyDiscount}
                    style={{ backgroundColor: "#0B5ED7", color: "#fff" }}
                  >
                    Sử dụng
                  </Button>
                </InputGroup>
                {error && <Message variant="danger">{error}</Message>}
                {data?.value && (
                  <Message variant="success">
                    Đơn hàng của bạn được giảm {data?.value}%
                  </Message>
                )}
                <Row>
                  <Col md={2} style={{ paddingRight: "0" }}>
                    Tổng :{" "}
                  </Col>
                  <Col md={3} style={{ paddingLeft: "0" }}>
                    {VND.format(
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )}{" "}
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
