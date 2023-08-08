import {
  DISCOUNT_LIST_REQUEST,
  DISCOUNT_LIST_SUCCESS,
  DISCOUNT_LIST_FAIL,
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_DELETE_FAIL,
} from "../constants/discountConstant";
export const discountListReducer = (
  state = {
    discountList: [],
  },
  action
) => {
  switch (action.type) {
    case DISCOUNT_LIST_REQUEST:
      return {
        loading: true,
        discountList: [],
      };
    case DISCOUNT_LIST_SUCCESS:
      return {
        loading: false,
        discountList: action.payload.listDiscount,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case DISCOUNT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const discountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case DISCOUNT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DISCOUNT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
