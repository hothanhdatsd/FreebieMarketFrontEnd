import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstant";
import { listTypeProducts } from "../../actions/typeProductActions.js";

const ProductEditScreen = ({ match, location }) => {
  let { id } = useParams();
  let navigate = useNavigate();
  const productId = id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
        dispatch(listTypeProducts());
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setCategory(product.category.name);
      }
    }
  }, [navigate, dispatch, product, productId, successUpdate]);
  const typeproductList = useSelector((state) => state.typeProductList);
  const { typeProducts, page, pages } = typeproductList;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        description,
        countInStock,
        category: {
          name: category,
          category: categoryId,
        },
      })
    );
  };
  const handleSelectChange = (event) => {
    setCategoryId(event.target.value);
    setCategory(event.target.options[event.target.selectedIndex].dataset.name);
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL_API}/api/upload`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Trở về
      </Link>

      <FormContainer>
        <h1>Thông tin sản phẩm</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="name"
                placeholder="Nhập tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Giá </Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Hình ảnh </Form.Label>
              <Form.Control
                type="text"
                placeholder="Chọn hình ảnh"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {/* <Form.Control
                id="image-file"
                type="file"
                custom
                onChange={uploadFileHandler}
                  ></Form.Control> */}
              <Form.Control
                id="image-file"
                type="file"
                custom
                onChange={uploadFileHandler}
              />

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Số lượng trong kho </Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số lượng "
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Loại sản phẩm </Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleSelectChange}
                // value={category}
              >
                {/* <option selected>{category}</option> */}
                {typeProducts?.map((item) => (
                  <option
                    key={item?._id}
                    data-name={item?.name}
                    value={item?._id}
                  >
                    {item?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Chi tiết</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập chi tiết "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
