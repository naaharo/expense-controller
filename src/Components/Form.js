import React from 'react';
import PropTypes from 'prop-types';
import '../css/Form.css'
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

  handleChange = ({ target: { id, value } }) => {
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
      <form id="walletForm">
        <div className="input-group value">
          <label className="input-group-text" htmlFor="value">Valor</label>
          <input type="text" className="form-control" aria-label="Amount" id="value" value={value} onChange={this.handleChange}/>
        </div>

        <div className="input-group curr">
          <label className="input-group-text" htmlFor="currency">Moeda</label>
          <select className="form-select" id="currency" onChange={this.handleChange}>
          { getCurrencies
              .map((curr, index) => <option key={index} value={curr}>{curr}</option>)}
          </select>
        </div>

        <div className="input-group method">
          <label className="input-group-text" htmlFor="method">Método</label>
          <select className="form-select" id="method" onChange={this.handleChange}>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Crédito">Crédito</option>
            <option value="Débito">Débito</option>
          </select>
        </div>

        <div className="input-group tag">
          <label className="input-group-text" htmlFor="tag">Categoria</label>
          <select className="form-select" id="tag" onChange={this.handleChange}>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>

        <div className="input-group descrip">
          <label className="input-group-text" htmlFor="description">Descrição</label>
          <input
            type="text"
            className="form-control"
            aria-label="Description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
        </div>

        { getEdit ? (
          <button
            type="button"
            className="btn btn-warning"
            id="formBtn"
            onClick={ this.editFormInfos }
          >
            Editar Despesa
          </button>
        )
          : (
            <button
              type="button"
              className="btn btn-info"
              id="formBtn"
              onClick={ this.saveFormInfos }
            >
              Adicionar Despesa
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
