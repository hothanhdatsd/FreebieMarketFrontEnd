import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./bootstrap.min.css";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserScreenEdit from "./screens/UserScreenEdit";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import DashBoard from "./screens/DashBoard";
import SuccessFBScreen from "./screens/SuccessFBScreen";
import SuccessGoogleScreen from "./screens/SuccessGoogleScreen";
import LoginFailScreen from "./screens/LoginFailScreen";
import "./style.css";
import CreateProductScreen from "./screens/CreateProductScreen";
import CreateTypeProductScreen from "./screens/CreateTypeProduct";
import TypeProductListScreen from "./screens/TypeProductListScreen";
import TypeProductEditScreen from "./screens/TypeProductEditScreen";
import Home from "./AdminUi/Home";
import VnpaymentScreen from "./screens/VnpaymentScreen";
const App = () => {
  const location = useLocation();

  // Check if the current route should exclude the Header and Footer
  const shouldExcludeHeaderFooter =
    location.pathname === "/successGG" ||
    location.pathname === "/successFB" ||
    location.pathname === "/auth/fail" ||
    location.pathname === "/login" ||
    location.pathname === "/register";
  // useEffect(() => {
  //   const handlePageHide = () => {
  //     // Your custom logic for when the user closes the browser/tab.
  //     sessionStorage.removeItem("userInfo");
  //   };

  //   document.addEventListener("visibilitychange", handlePageHide);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handlePageHide);
  //   };
  // }, []);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {!shouldExcludeHeaderFooter && <Header />}
      <Routes>
        {/* Define your routes here */}
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserScreenEdit />} />
        <Route
          path="/admin/productlist"
          element={<ProductListScreen />}
          exact
        />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
          exact
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/orderlist" element={<OrderListScreen />} exact />
        <Route path="/search/:keyword" element={<HomeScreen />} exact />
        <Route path="/page/:pageNumber" element={<HomeScreen />} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
          exact
        />
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/admin/dashboard" element={<Home />} />
        <Route path="/successGG" element={<SuccessGoogleScreen />} />
        <Route path="/successFB" element={<SuccessFBScreen />} />
        <Route path="/auth/fail" element={<LoginFailScreen />} exact />
        <Route
          path="/admin/createproduct"
          element={<CreateProductScreen />}
          exact
        />
        <Route
          path="/admin/createtypeproduct"
          element={<CreateTypeProductScreen />}
        />
        <Route
          path="/admin/typeproductlist"
          element={<TypeProductListScreen />}
          exact
        />{" "}
        <Route
          path="/admin/typeproductlist/:id/edit"
          element={<TypeProductEditScreen />}
          exact
        />
        <Route path="/create_payment_url" element={<VnpaymentScreen />} exact />
      </Routes>
      {!shouldExcludeHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
