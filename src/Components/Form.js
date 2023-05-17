import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrenciesCode,
  addExpense,
  handleEdit,
  deleteExpense } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseObj: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: '',
      },
      count: 0,
    };
  }

  componentDidMount() {
    const { currenciesToState } = this.props;
    currenciesToState();
  }

  handleChange = ({ target: { value, id } }) => {
    const { expenseObj } = this.state;
    this.setState({ expenseObj: { ...expenseObj, [id]: value } });
  }

  fetchCurrencies = async () => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .catch((error) => new Error(error));

  saveFormInfos = async () => {
    const { expenseObj, count } = this.state;
    const api = await this.fetchCurrencies();

    this.setState((prevState) => ({
      expenseObj: { ...expenseObj, exchangeRates: api, id: count },
      count: prevState.count + 1,
    }), () => {
      this.save();
      this.setState({ expenseObj: { ...expenseObj, value: '', description: '' } });
    });
  }

  save = () => {
    const { expenseObj } = this.state;
    const { saveExpenses } = this.props;
    saveExpenses(expenseObj);
  }

  editFormInfos = () => {
    const { getExpenses, getId, hndEdit } = this.props;
    const { expenseObj } = this.state;
    const { exchangeRates, id } = getExpenses[getId];
    this.setState({
      expenseObj: { ...expenseObj, exchangeRates, id },
    }, () => {
      this.edit();
      this.setState({ expenseObj: { ...expenseObj, value: '', description: '' } },
        () => hndEdit({ bool: false, id: 0 }));
    });
  }

  edit = () => {
    const { expenseObj } = this.state;
    const { delExpense, getExpenses, getId } = this.props;
    const expenses = getExpenses;
    expenses[getId] = expenseObj;
    delExpense(expenses);
  }

  render() {
    const { expenseObj: { description, value } } = this.state;
    const { getCurrencies, getEdit } = this.props;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            { getCurrencies
              .map((currency, index) => <option key={ index }>{ currency }</option>)}
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>

        { getEdit ? (
          <button
            type="button"
            onClick={ this.editFormInfos }
          >
            Editar despesa
          </button>
        )
          : (
            <button
              type="button"
              onClick={ this.saveFormInfos }
            >
              Adicionar despesa
            </button>
          ) }
      </form>
    );
  }
}

Form.propTypes = {
  currenciesToState: PropTypes.func.isRequired,
  getCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpenses: PropTypes.func.isRequired,
  getEdit: PropTypes.bool.isRequired,
  getId: PropTypes.number.isRequired,
  delExpense: PropTypes.func.isRequired,
  hndEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getCurrencies: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
  getEdit: state.usefulDatas.isEditing,
  getId: state.usefulDatas.id,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesToState: () => dispatch(fetchCurrenciesCode()),
  saveExpenses: (state) => dispatch(addExpense(state)),
  delExpense: (state) => dispatch(deleteExpense(state)),
  hndEdit: (state) => dispatch(handleEdit(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
