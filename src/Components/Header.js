import React from 'react';
import PropTypes from 'prop-types';
import '../css/Header.css'
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { getEmail, getExpenses } = this.props;
    return (
      <header className="walletHeader">
        <div className="headerMain">
          <h1>Expense Controller</h1>
          <h4>{getEmail}</h4>
        </div>
        <div className="brl"><h4>Câmbio Utilizado: BRL</h4></div>
        <div className="total">
          <h4> Total: {getExpenses.map((expense) => (
              expense.value * expense.exchangeRates[expense.currency].ask
            )).reduce((a, b) => a + b, 0).toFixed(2)}
          </h4>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getUsefulDatas: state.usefulDatas,
  getExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
