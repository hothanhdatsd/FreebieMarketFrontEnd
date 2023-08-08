import {
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_FAIL,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_LIST_REQUEST,
  DISCOUNT_LIST_FAIL,
  DISCOUNT_LIST_SUCCESS,
} from "../constants/discountConstant";
import axios from "axios";
export const listDiscount =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DISCOUNT_LIST_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/api/discount?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: DISCOUNT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DISCOUNT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const editTypeProduct = (typeProduct) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: TYPE_PRODUCT_LIST_REQUEST,
//     });
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(
//       `${process.env.REACT_APP_URL_API}/api/typeproducts`,
//       config
//     );

//     dispatch({
//       type: TYPE_PRODUCT_LIST_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: TYPE_PRODUCT_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const deleteDiscount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISCOUNT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `${process.env.REACT_APP_URL_API}/api/discount/${id}`,
      config
    );
    dispatch({
      type: DISCOUNT_DELETE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: DISCOUNT_DELETE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
