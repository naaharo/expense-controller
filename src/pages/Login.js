import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      disableSubmit: true,
      emailVerified: false,
      passwordVerified: false,
    };
  }

  verifyEmail = ({ target: { value } }) => {
    const regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
    const validEmail = regex.test(value);
    this.setState({
      emailValue: value,
      emailVerified: validEmail,
    }, () => {
      this.mustEnable();
    });
  }

  verifyPassword = ({ target: { value } }) => {
    const minChar = 6;

    this.setState({
      passwordVerified: value.length >= minChar,
    }, () => {
      this.mustEnable();
    });
  }

  mustEnable = () => {
    const { emailVerified, passwordVerified } = this.state;
    const enable = emailVerified && passwordVerified;

    this.setState({
      disableSubmit: !enable,
    });
  }

  render() {
    const { disableSubmit, emailValue } = this.state;
    const { dispatchEmail } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              id="email"
              onChange={ this.verifyEmail }
              data-testid="email-input"
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              onChange={ this.verifyPassword }
              data-testid="password-input"
            />
          </label>

          <Link to="/carteira">
            <button
              type="button"
              onClick={ () => dispatchEmail(emailValue) }
              disabled={ disableSubmit }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (state) => dispatch(changeEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
