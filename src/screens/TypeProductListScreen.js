import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTypeProducts } from "../actions/typeProductActions.js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import { PRODUCT_CREATE_RESET } from "../constants/productConstant";

const TypeProductListScreen = () => {
  const { pageNumber } = useParams();
  const pageNumberr = pageNumber || 1;

  const dispatch = useDispatch();

  const typeproductList = useSelector((state) => state.typeProductList);
  const { loading, error, typeProducts, page, pages } = typeproductList;

  useEffect(() => {
    dispatch(listTypeProducts());
  }, [dispatch]);
  return (
    <>
      <Row
        className="align-items-center"
        style={{
          width: "100%",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Col>
          <h1>Loại sản phẩm</h1>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Thêm sản phẩm
            </Button>
          </Col> */}
          <Col>
            <Link to="/admin/createtypeproduct"> Thêm loại sản phẩm</Link>
          </Col>
        </Col>
      </Row>
      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorDelete}</Message>} */}
      {loading ? (
        <Message />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row style={{ width: "100%", padding: "0 20px" }}>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Chi tiết</th>
                {/* <th>Loại</th> */}
              </tr>
            </thead>
            <tbody>
              {typeProducts?.map((typeproduct) => (
                <tr key={typeproduct._id}>
                  <td>{typeproduct._id}</td>
                  <td>{typeproduct.name}</td>
                  {/* <td>{VND.format(typeproduct.price)}đ</td> */}
                  <td>{typeproduct.description}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/typeproductlist/${typeproduct._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      //       onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </Row>
      )}
    </>
  );
};

export default TypeProductListScreen;
