import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      variant="dark"
      style={{ objectFit: "contain", padding: "0 20px" }}
    >
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className="carousel-flex">
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="d-block  w50"
            />
            <Container className="w50">
              <h2 style={{ color: "#000", textDecoration: "none" }}>
                {product.name} ({product.price}đ)
              </h2>
            </Container>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
