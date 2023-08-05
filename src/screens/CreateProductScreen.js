import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTypeProducts } from "../actions/typeProductActions.js";
import { createProduct } from "../actions/productActions.js";
const CreateProductScreen = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [countInStock, setCountInStock] = useState("Loai san pham");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        category: {
          name: category,
          category: categoryId,
        },
        image,
        price,
        countInStock,
        description,
      })
    );
  };
  const typeproductList = useSelector((state) => state.typeProductList);
  const { typeProducts, page, pages } = typeproductList;

  const product = useSelector((state) => state.productCreate);
  const { loading, error, success } = product;

  useEffect(() => {
    dispatch(listTypeProducts());
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      dispatch({ type: "PRODUCT_CREATE_RESET" });
      navigate("/admin/productlist");
    }
  }, [success, navigate]);
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
  const handleSelectChange = (event) => {
    setCategoryId(event.target.value);
    setCategory(event.target.options[event.target.selectedIndex].dataset.name);
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Trở về
      </Link>

      <FormContainer>
        <h1>Thông tin sản phẩm</h1>
        {/* {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant="danger">{error}</Message>
                    ) : ( */}
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
            <Form.Select
              aria-label="Default select example"
              onChange={handleSelectChange}
            >
              {typeProducts?.map((item) => (
                <option
                  data-name={item?.name}
                  key={item?._id}
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
      </FormContainer>
    </>
  );
};

export default CreateProductScreen;
