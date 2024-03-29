import {
  TYPE_PRODUCT_LIST_REQUEST,
  TYPE_PRODUCT_LIST_SUCCESS,
  TYPE_PRODUCT_LIST_FAIL,
  TYPE_PRODUCT_DELETE_REQUEST,
  TYPE_PRODUCT_DELETE_SUCCESS,
  TYPE_PRODUCT_DELETE_FAIL,
} from "../constants/typeProductConstant";
export const typeProductListReducer = (
  state = {
    typeProducts: [],
  },
  action
) => {
  switch (action.type) {
    case TYPE_PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case TYPE_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        typeProducts: action.payload.typeProducts,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TYPE_PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const typeProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPE_PRODUCT_DELETE_REQUEST:
      return {
        loadingType: true,
      };
    case TYPE_PRODUCT_DELETE_SUCCESS:
      return {
        loadingType: false,
        successType: true,
      };
    case TYPE_PRODUCT_DELETE_FAIL:
      return {
        loadingType: false,
        errorType: action.payload,
      };
    default:
      return state;
  }
};
