import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import { updateProduct } from "../actions/productActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return Math.round(num / 24000).toFixed(1);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = cart.itemsPrice * 0.05;
  cart.taxPrice = 0;
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(1);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  let VND = new Intl.NumberFormat("en-US", {
    currency: "VND",
    style: "currency",
  });
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [history, success, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }),
      updateProduct({
        sold: cart.cartItems.qty,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row style={{ width: "100%", padding: "0 20px" }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4> Thông tin vận chuyển </h4>{" "}
              <p>
                <strong> Địa chỉ: </strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.street}, {cart.shippingAddress.ward},{" "}
                {cart.shippingAddress.district}, {cart.shippingAddress.city}{" "}
              </p>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4> Phương thức thanh toán </h4> <strong> </strong>{" "}
              {cart.paymentMethod}{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4> Sản phẩm </h4>{" "}
              {cart.cartItems.length === 0 ? (
                <Message> Giỏ hàng đang trống </Message>
              ) : (
                <ListGroup variant="flush">
                  {" "}
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>{" "}
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {" "}
                            {item.name}{" "}
                          </Link>{" "}
                        </Col>{" "}
                        <Col md={4}>
                          {" "}
                          {item.qty}x {VND.format(item.price)} đ ={" "}
                          {VND.format(item.qty * item.price)} đ{" "}
                        </Col>{" "}
                      </Row>{" "}
                    </ListGroup.Item>
                  ))}{" "}
                </ListGroup>
              )}{" "}
            </ListGroup.Item>{" "}
          </ListGroup>{" "}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4> Thông tin đơn hàng </h4>{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Đơn giá </Col> <Col> {cart.itemsPrice} $</Col>{" "}
                </Row>{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Phí vận chuyển </Col>{" "}
                  <Col> {cart.shippingPrice} $ </Col>{" "}
                </Row>{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Mã giảm giá </Col> <Col> {cart.taxPrice} $ </Col>{" "}
                </Row>{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Tổng </Col> <Col> {cart.totalPrice} $ </Col>{" "}
                </Row>{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                {" "}
                {error && <Message variant="danger"> {error} </Message>}{" "}
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Xác nhận đặt hàng{" "}
                </Button>{" "}
              </ListGroup.Item>{" "}
            </ListGroup>{" "}
          </Card>{" "}
        </Col>{" "}
      </Row>{" "}
    </>
  );
};

export default PlaceOrderScreen;
