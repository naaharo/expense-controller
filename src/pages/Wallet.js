import React from 'react';
import PropTypes from 'prop-types';
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

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
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
                    data-testid="edit-btn"
                    onClick={ () => changeEdit({ bool: true, id: expense.id }) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
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
