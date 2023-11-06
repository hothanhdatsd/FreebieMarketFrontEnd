import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  let VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  });

  return (
    <Card
      className="my-3 p-3 rounded"
      style={{
        height: "487.55px",
      }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ width: "272px", height: "216px" }}
        />
      </Link>

      <Card.Body style={{ paddingLeft: "0", paddingRight: "0" }}>
        <Link className="product-name" to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" style={{ position: "absolute", bottom: "120px" }}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} đánh giá`}
          />
        </Card.Text>

        <Card.Text as="h3">
          <div
            style={{ position: "absolute", bottom: "60px" }}
            className="my-3"
          >
            {VND.format(product.price)}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
