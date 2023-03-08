import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from "cdbreact";
import "../index.css";
const Footer = () => {
  return (
    <CDBFooter
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        backgroundColor: "#212529",
        color: "#fff",
      }}
      className="shadow"
    >
      <CDBBox
        display="flex"
        flex="column"
        className="mx-auto py-5"
        style={{ width: "90%" }}
      >
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              {/* <img alt="logo" src="logo" width="30px" /> */}
              <span
                className="ml-3 h5 font-weight-bold "
                style={{ color: "#fff" }}
              >
                NhaXinh
              </span>
            </a>
            <p className="my-3" style={{ width: "250px" }}>
              Hãy để lại email để có thể nhận thêm thông tin và mã giảm giá từ
              FreebieMarket
            </p>
            <CDBBox display="flex" className="mt-4">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              NhaXinh
            </p>
            <CDBBox
              flex="column"
              style={{
                cursor: "pointer",
                padding: "0",
                textDecoration: "underline",
              }}
            >
              <p>Thông tin</p>
              <p>Đánh giá</p>
              <p>Liên hệ</p>
              <p>Bài viết</p>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Hỗ trợ
            </p>
            <CDBBox
              flex="column"
              style={{
                cursor: "pointer",
                padding: "0",
                textDecoration: "underline",
              }}
            >
              <p>Thanh toán</p>
              <p>Đăng ký</p>
              <p>Đăng nhập</p>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Sản phẩm
            </p>
            <CDBBox
              flex="column"
              style={{
                cursor: "pointer",
                padding: "0",
                textDecoration: "underline",
              }}
            >
              <p>Thanh toán</p>
              <p>Đổi trả</p>
              <p>Khiếu nại</p>
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <small className="text-center mt-5">
          &copy; FreebieMarket, 2022. All rights reserved.
        </small>
      </CDBBox>
    </CDBFooter>
  );
};

export default Footer;
