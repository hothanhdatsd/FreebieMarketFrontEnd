import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import {
  listProducts,
  deleteProduct,
  importProduct,
} from "../../actions/productActions";
import moment from "moment";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstant";

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
  let VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  });

  const importProductHandler = (product) => {
    dispatch(importProduct());
  };

  return (
    <div
      style={{
        minHeight: "57%",
      }}
    >
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
          <h1>Sản phẩm</h1>
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
            <Link to="/admin/createproduct"> Thêm sản phẩm</Link>
          </Col>
          <Col className="text-right">
            <Button
              className="my-3"
              onClick={importProductHandler}
              style={{ float: "right" }}
            >
              <i className="fas fa-plus"></i> Nhập dữ liệu
            </Button>
            {/* <Form.Group controlId="formFileSingle" className="mb-3">
              <Form.Label>Single file input example</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {selectedFile && (
                <div>
                  <p>Selected file: {selectedFile.name}</p>
                </div>
              )}
            </Form.Group> */}
          </Col>
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
        <Row style={{ width: "100%", padding: "0 20px" }}>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Loại</th>
                <th>Giá</th>
                <th>Ngày tạo</th>
                <th>Ngày cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product?.category?.name}</td>
                  <td>{VND.format(product.price)}</td>
                  <td>{moment(product?.createdAt).format("DD/MM/YYYY")}</td>
                  <td>{moment(product?.updatedAt).format("DD/MM/YYYY")}</td>
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
        </Row>
      )}
    </div>
  );
};

export default ProductListScreen;
