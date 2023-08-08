import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../components/Message.js";
import Paginate from "../../components/Paginate.js";
import moment from "moment";
import { listDiscount, deleteDiscount } from "../../actions/discountActions.js";

const DiscountListScreen = () => {
  const { pageNumber } = useParams();
  const pageNumberr = pageNumber || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //danh sach ma giam gia
  const discounts = useSelector((state) => state.discountList);
  const { loading, error, discountList, page, pages } = discounts;
  //xoa ma giam gia
  const discountDelete = useSelector((state) => state.discountDelete);
  const {
    success,
    error: errorDelete,
    loading: loadingDelete,
  } = discountDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteHandler = async (id) => {
    dispatch(deleteDiscount(id));
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listDiscount(pageNumberr));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, success, pageNumberr]);
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
          <h1>Mã giảm giá</h1>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Col>
            <Link to="/admin/creatediscount"> Thêm mã giảm giá</Link>
          </Col>
        </Col>
      </Row>

      {loading ? (
        <Message />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row style={{ width: "100%", padding: "0 20px" }}>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên</th>
                <th>Giá trị</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {discountList?.map((discount) => (
                <tr key={discount._id}>
                  <td>{discount._id}</td>
                  <td>{discount.name}</td>
                  <td>{discount.value}</td>
                  <td>{moment(discount.startDate).format("DD/MM/YYYY")}</td>
                  <td>{moment(discount.expDate).format("DD/MM/YYYY")}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/discountlist/${discount._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(discount._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} discount />
        </Row>
      )}
    </div>
  );
};

export default DiscountListScreen;
