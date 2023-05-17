export const changeEmail = (email) => ({ type: 'EMAIL', email });

export const addExpense = (expense) => ({ type: 'ADD_EXPENSE', expense });

export const deleteExpense = (expenses) => ({ type: 'DEL_EXPENSE', expenses });

export const handleEdit = (state) => ({ type: 'EDIT', bool: state.bool, id: state.id });

const isFetching = () => ({ type: 'FETCHING' });
const currenciesCode = (currencies) => ({ type: 'CURRENCIES', currencies });
const requestFail = (error) => ({ type: 'REQUEST_FAIL', error });

export const fetchCurrenciesCode = () => async (dispatch) => {
  dispatch(isFetching());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => {
      const currArray = Object.values(json);
      const filteredArray = currArray.filter((curr) => curr.codein !== 'BRLT');
      const expectedArray = filteredArray.map((curr) => curr.code);
      return dispatch(currenciesCode(expectedArray));
    })
    .catch((error) => dispatch(requestFail(error)));
};
