import React from 'react';
import '../css/Login.css'
import PropTypes from 'prop-types';
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
        <header id="loginHeader">
          <h1>Expense Controller</h1>
          <h3>Organize suas despesas internacionais</h3>
        </header>

        <form id="login">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="usuario@exemplo.com"
              onChange={this.verifyEmail}
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Senha"
              onChange={this.verifyPassword}
            />
            <label htmlFor="password" className="form-label">Senha</label>
          </div>

          { disableSubmit
            ? <a className="btn btn-secondary disabled btn-lg" role="button" aria-disabled="true">Entrar</a>
            : <a className="btn btn-success btn-lg"
                href="/carteira"
                role="button"
                onClick={() => dispatchEmail(emailValue)}>
                Entrar
              </a>
          }
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
