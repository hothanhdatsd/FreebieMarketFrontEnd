import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form
      onSubmit={submitHandler}
      style={{ display: "flex", marginLeft: "170px" }}
    >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm sản phẩm..."
        className="mr-sm-2 ml-sm-7 "
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2"
        style={{ color: "#fff", borderColor: "#fff", width: "108px" }}
      >
        Tìm kiếm
      </Button>
    </Form>
  );
}
