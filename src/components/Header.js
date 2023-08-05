import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "../components/SearchBox";
import "../bootstrap.min.css";
import logo from "../images/logo.png";
import { SearchOutline } from "react-ionicons";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    sessionStorage.clear();
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header>
      <Nav
        class="navbar navbar-expand-lg navbar-dark bg-dark  "
        style={{ color: "#fff", height: "86px" }}
        expand="lg"
        bg="dark"
        variant="dark"
        collapseOnSelect
      >
        <Container
          className=" navbar-expand-lg navbar-dark  header-container"
          style={{ cursor: "pointer" }}
        >
          <LinkContainer to="/">
            <ListGroupItem className="flex">
              <Image className="food-logo" src={logo} rounded />
              {/* <Navbar.Brand>FreebieMarket</Navbar.Brand> */}
            </ListGroupItem>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <LinkContainer to="/cart/id?">
                <Nav.Link>
                  <i className="fas fa-shopping-cart custom"></i> Giỏ hàng
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Quản trị" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Người dùng</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Sản phẩm</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/typeproductlist">
                    <NavDropdown.Item>Loại sản phẩm</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Đặt hàng</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Doanh thu</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown
                  className="custom"
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Thông tin người dùng</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="custom">
                    <i className="fas fa-user"></i> Đăng nhập
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Nav>
    </header>
  );
};

export default Header;
