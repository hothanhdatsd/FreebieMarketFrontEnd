import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { listUsers, deleteUser } from "../../actions/userActions";
import Paginate from "../../components/Paginate.js";
import moment from "moment";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const pageNumberr = pageNumber || 1;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(pageNumberr));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete, userInfo, pageNumberr]);

  const deleteHandler = async (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <Row style={{ padding: "0 20px", minHeight: "57%" }}>
      <h1>Người dùng</h1>
      {loading ? (
        <Message />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Quyền quản trị</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id}>
                <td>{user?._id}</td>
                <td>{user?.name}</td>
                <td>
                  <a href={`mailto:${user?.email}`}>{user?.email}</a>
                </td>
                <td>
                  {user?.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>{moment(user?.createdAt).format("DD/MM/YYYY")}</td>
                <td>{moment(user?.updatedAt).format("DD/MM/YYYY")}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user?._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate page={page} pages={pages} isAdmin={true} user />
    </Row>
  );
};

export default UserListScreen;
