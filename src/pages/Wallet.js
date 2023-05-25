import React from 'react';
import PropTypes from 'prop-types';
import '../css/Wallet.css'
import { connect } from 'react-redux';
import { deleteExpense, handleEdit } from '../actions';
import Form from '../Components/Form';
import Header from '../Components/Header';

class Wallet extends React.Component {
  deleteRow = ({ target }) => {
    const {
      getExpenses,
      delExpense,
    } = this.props;
    const raw = document.querySelector('tbody').children[target.id];
    const foeDescription = raw.firstChild.innerHTML;

    const updatedExpenses = getExpenses
      .filter((expense) => expense.description !== foeDescription);

    delExpense(updatedExpenses);
  }

  render() {
    const { getExpenses, changeEdit } = this.props;
    return (
      <>
        <Header />

        <Form />

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {getExpenses.map((expense, index) => (
              <tr key={ `raw${index}` }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  {
                    parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    (expense.exchangeRates[expense.currency].ask * expense.value)
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={ () => changeEdit({ bool: true, id: expense.id }) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    id={ expense.id }
                    onClick={ this.deleteRow }
                  >
                    Excluir
                  </button>
                </td>
              </tr>)) }
          </tbody>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  getExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  delExpense: PropTypes.func.isRequired,
  changeEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getCurrencies: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
  getUsefulDatas: state.usefulDatas,
  getEdit: state.usefulDatas.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (state) => dispatch(deleteExpense(state)),
  changeEdit: (state) => dispatch(handleEdit(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
