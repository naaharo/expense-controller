import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { getEmail, getExpenses } = this.props;
    return (
      <header>
        <h2>{ getEmail }</h2>
        <p>
          { getExpenses.map((expense) => (
            expense.value * expense.exchangeRates[expense.currency].ask
          )).reduce((a, b) => a + b, 0).toFixed(2) }
        </p>
        <p>Câmbio Utilizado: BRL</p>
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
