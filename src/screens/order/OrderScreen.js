import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import moment from "moment";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstant";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { id } = useParams();
  const orderId = id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    // const addDecimals = (num) => {
    //   return Math.round(num / 24000).toFixed(1);
    // };
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    // order.itemsPrice = addDecimals(
    //   order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    // );
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }
  let VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL_API}/api/payment/create_payment_url`,
      {
        amount: order?.totalPrice,
        orderId: order?._id,
        language: "vn",
      }
    );
    window.open(data, "_self");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        `${process.env.REACT_APP_URL_API}/api/config/paypal`
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    orderId,
    successPay,
    successDeliver,
    order,
    navigate,
    userInfo,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row style={{ width: "100%", padding: "0 20px" }}>
        <Col md={8}>
          <h1>Đơn hàng {order._id}</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Thông tin vận chuyển</h2>
              <p>
                <strong>Tên: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Địa chỉ:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Vận chuyển ngày: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Chưa vận chuyển</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Phương thức thanh toán</h2>
              <p>
                <strong>Phương thức: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Thanh toán ngày: {moment(order.paidAt).format("YYYY/MM/DD")}
                </Message>
              ) : (
                <Message variant="danger">Chưa thanh toán</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Các sản phẩm</h2>
              {order.orderItems.length === 0 ? (
                <Message>Giỏ hàng đang trống</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {VND.format(item.price)} ={" "}
                          {VND.format(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Thông tin thanh toán</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Đơn giá</Col>
                  <Col>{VND.format(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí vận chuyển</Col>
                  <Col>{VND.format(order.shippingPrice.toFixed(1))}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Mã giảm giá</Col>
                  <Col>{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Tổng </Col>
                  <Col>{VND.format(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid &&
                order.paymentMethod === "PayPal" &&
                order.user._id === userInfo._id && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              {!order.isPaid &&
                order.paymentMethod === "vnPay" &&
                order.user._id === userInfo._id && (
                  <ListGroup.Item>
                    <Button onClick={handleSubmit}>Thanh toán VNPay</Button>
                  </ListGroup.Item>
                )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Xác nhận đã vận chuyển
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
