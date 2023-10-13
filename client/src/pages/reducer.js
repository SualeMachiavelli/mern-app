export const loadingInitialState = {
  products: [],
  isLoading: false,
  error: null,
  status: false,
};

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return { isLoading: true };
    case "success":
      return { isLoading: false, products: action.payload };
    case "error":
      return { isLoading: false, error: action.payload };
    case "status":
      return { isLoading: false, status: true };
    default:
      return loadingInitialState;
  }
};
