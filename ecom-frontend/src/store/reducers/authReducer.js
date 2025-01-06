const initialState = {
  user: null,
  address: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "SIGN_OUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
