import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
  importProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstant";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const pageNumberr = pageNumber || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
    import: successImport,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumberr));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    createdProduct,
    successCreate,
    pageNumberr,
    successImport,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    dispatch(createProduct());
  };
  const importProductHandler = (product) => {
    dispatch(importProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Sản phẩm</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={createProductHandler}
            style={{ float: "right" }}
          >
            <i className="fas fa-plus"></i> Thêm sản phẩm
          </Button>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={importProductHandler}
            style={{ float: "right" }}
          >
            <i className="fas fa-plus"></i> Nhập dữ liệu
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Message />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Loại</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}đ</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
