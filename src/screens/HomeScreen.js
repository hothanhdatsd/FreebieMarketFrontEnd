import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
const HomeScreen = ({ match }) => {
  const { keyword } = useParams();
  const { pageNumber } = useParams();

  const keywordd = keyword;
  const pageNumberr = pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keywordd, pageNumberr));
  }, [dispatch, keywordd, pageNumberr]);
  return (
    <>
      {!keywordd && <ProductCarousel />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row style={{ width: "100%", margin: "0", marginTop: "100px" }}>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
