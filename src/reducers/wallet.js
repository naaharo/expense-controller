const WALLET_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const wallet = (state = WALLET_STATE, action) => {
  switch (action.type) {
  case 'FETCHING':
    return {
      ...state,
      isFetching: true };

  case 'CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false };

  case 'REQUEST_FAIL':
    return {
      ...state,
      error: action.error,
      isFetching: false };

  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense] };
  case 'DEL_EXPENSE':
    return {
      ...state,
      expenses: action.expenses };
  default:
    return state;
  }
};

export default wallet;
