import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userName: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  handleChange({ target }) {
    const { value } = target;
    let isButtonDisabled = true;
    const minChar = 3;
    if (value.trim().length >= minChar) {
      isButtonDisabled = false;
      this.setState({
        isButtonDisabled,
      });
    }
    this.setState(() => ({
      userName: value,
      isButtonDisabled,
    }));
  }

  render() {
    const { userName, isButtonDisabled, isLoading } = this.state;
    return (
      <div className="page-login" data-testid="page-login">
        {
          isLoading ? (
            <Loading />
          ) : (
            <form>
              <label htmlFor="name-input">
                <input
                  type="text"
                  name="name-input"
                  data-testid="login-name-input"
                  placeholder="Nome"
                  onChange={ this.handleChange }
                  value={ userName }
                />
              </label>
              <button
                className="login-button"
                data-testid="login-submit-button"
                disabled={ isButtonDisabled }
                onClick={ async (event) => {
                  const { history } = this.props;
                  event.preventDefault();
                  this.setState({
                    isLoading: true,
                  });
                  await createUser({ name: userName });
                  this.setState({
                    isLoading: false,
                  });
                  history.push('/search');
                } }
              >
                Entrar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
