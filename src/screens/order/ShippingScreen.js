import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { saveShippingAddress } from "../../actions/cartActions.js";

const ShippingScreen = () => {
  // const cart = useSelector((state) => state.cart);

  let navigate = useNavigate();

  const [address, setAddress] = useState();
  const [street, setStreet] = useState();
  const [ward, setWard] = useState();
  const [district, setDistrict] = useState();
  const [city, setCity] = useState();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, street, ward, district, city }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 /> */}
      <h1>Thông tin vận chuyển</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Nhập địa chỉ "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="street">
          <Form.Label>Đường</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Nhập tên đường"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="ward">
          <Form.Label>Phường</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Nhập tên phường"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="ward">
          <Form.Label>Quận</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Nhập tên quận"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Thành phố</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Nhập tên thành phố"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
