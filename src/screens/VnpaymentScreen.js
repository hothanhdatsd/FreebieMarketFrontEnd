import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VnpaymentScreen = () => {
  const [payment, setPayment] = useState();
  const [language, setLanguage] = useState("vn");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${process.env.REACT_APP_URL_API}/api/payment/create_payment_url`,
      {
        amount: 1000000,
        bankCode: payment,
        language,
      }
    );
    window.open(data, "_self");
  };
  const handleChangeTypePayment = (e) => {
    setPayment(e.target.value);
  };
  const handleChangeLG = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <div class="table-responsive">
      <form id="createOrder" onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="amount">Số tiền</label>
          <input
            class="form-control"
            type="text"
            id="amount"
            name="amount"
            placeholder="Số tiền"
            value="{{amount}}"
          />
        </div>

        <div class="form-group">
          <label>Chọn Phương thức thanh toán:</label>
          <label class="control-label">
            <input
              type="radio"
              name="bankCode"
              id="defaultPaymentMethod"
              value=""
              checked="true"
              onChange={handleChangeTypePayment}
            />{" "}
            Cổng thanh toán VNPAYQR
          </label>
          <label class="control-label">
            <input
              type="radio"
              name="bankCode"
              id="vnpayqrPaymentMethod"
              value="VNPAYQR"
              onChange={handleChangeTypePayment}
            />{" "}
            Thanh toán qua ứng dụng hỗ trợ VNPAYQR
          </label>
          <label class="control-label">
            <input
              type="radio"
              name="bankCode"
              id="vnbankPaymentMethod"
              onChange={handleChangeTypePayment}
              value="VNBANK"
            />{" "}
            Thanh toán qua ATM-Tài khoản ngân hàng nội địa
          </label>
          <label class="control-label">
            <input
              type="radio"
              name="bankCode"
              id="intcardPaymentMethod"
              onChange={handleChangeTypePayment}
              value="INTCARD"
            />{" "}
            Thanh toán qua thẻ quốc tế
          </label>
        </div>

        <div class="form-group">
          <label>Ngôn ngữ</label>
          <label class="control-label">
            <input
              onChange={handleChangeLG}
              type="radio"
              name="language"
              id="vnLanguage"
              value="vn"
              checked="true"
            />{" "}
            Tiếng việt
          </label>
          <label class="control-label">
            <input
              onChange={handleChangeLG}
              type="radio"
              name="language"
              id="enLanguage"
              value="en"
            />{" "}
            Tiếng anh
          </label>
        </div>

        <button class="btn btn-default" id="btnPopup" type="submit">
          Thanh toán
        </button>
      </form>
    </div>
  );
};

export default VnpaymentScreen;
