import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../Components/Carregando';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      buttonDisabled: true,
      buttonClick: false,
      loadOn: false,
    };
  }

  getInput = (event) => {
    const { value } = event.target;
    this.setState({ inputName: value }, () => {
      this.setState({ buttonDisabled: this.disabledButton() });
    });
  }

  disabledButton = () => {
    const { inputName } = this.state;
    const THREE = 3;
    if (inputName.length >= THREE) {
      return false;
    }
    return true;
  }

  getUserName = () => {
    const { inputName } = this.state;
    this.setState({ buttonClick: true });
    const userInfos = {
      name: inputName,
    };
    createUser(userInfos)
      .then(() => this.setState({ loadOn: true }));
  }

  validateRedirect = () => {
    const { loadOn } = this.state;
    if (loadOn) return <Redirect to="/search" />;
    return <Carregando />;
  }

  render() {
    const { buttonDisabled, buttonClick } = this.state;

    return (
      buttonClick
        ? this.validateRedirect()
        : (
          <div data-testid="page-login">
            <form>
              <label htmlFor="login-name-input">
                Login
                <input
                  type="text"
                  data-testid="login-name-input"
                  minLength="3"
                  onChange={ this.getInput }
                />
              </label>
              <button
                disabled={ buttonDisabled }
                data-testid="login-submit-button"
                type="submit"
                onClick={ this.getUserName }
              >
                Entrar
              </button>
            </form>
          </div>
        )
    );
  }
}

export default Login;
