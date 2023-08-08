import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  typeProduct,
  discount,
  user,
}) => {
  return (
    pages > 1 && (
      <Pagination style={{ paddingLeft: "20px" }}>
        {[...Array(pages).keys()]?.map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : typeProduct
                ? `/admin/typeproductlist/${x + 1}`
                : discount
                ? `/admin/discountlist/${x + 1}`
                : user
                ? `/admin/userlist/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
