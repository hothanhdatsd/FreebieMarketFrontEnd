import {
  TYPE_PRODUCT_LIST_REQUEST,
  TYPE_PRODUCT_LIST_SUCCESS,
  TYPE_PRODUCT_LIST_FAIL,
} from "../constants/typeProductConstant";
import axios from "axios";
export const listTypeProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TYPE_PRODUCT_LIST_REQUEST,
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
        `${process.env.REACT_APP_URL_API}/api/typeproducts`,
        config
      );

      dispatch({
        type: TYPE_PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TYPE_PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editTypeProduct = (typeProduct) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TYPE_PRODUCT_LIST_REQUEST,
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
      `${process.env.REACT_APP_URL_API}/api/typeproducts`,
      config
    );

    dispatch({
      type: TYPE_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
