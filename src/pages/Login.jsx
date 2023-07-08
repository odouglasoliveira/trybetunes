import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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
      <div
        className="flex bg-emerald-500 justify-center items-center h-screen"
        data-testid="page-login"
      >
        {
          isLoading ? (
            <Loading />
          ) : (
            <form
              className="
              rounded-lg
              border-emerald-500
              shadow-xl
              bg-white
              flex-col flex justify-center items-center
              w-3/6 h-4/6 gap-24"
            >
              <h2 className="font-bold text-center text-2xl text-emerald-500 ">
                Login
              </h2>
              <div className="flex justify-center items-center gap-2 flex-col w-11/12">
                <input
                  type="text"
                  className="border shadow-xl
                  border-gray-400
                  w-3/6 rounded-md
                  text-center p-1
                  outline-none text-md"
                  name="name-input"
                  placeholder="Digite seu nome"
                  onChange={ this.handleChange }
                  value={ userName }
                />
                <button
                  className="border-2 font-semibold
                text-white rounded-lg w-3/6 h-10
                bg-emerald-500 bg-opacity-50
                shadow-xl
                disabled:cursor-not-allowed
                enabled:bg-opacity-100
                enabled:hover:scale-105
                transition duration-200"
                  disabled={ isButtonDisabled }
                  onClick={ async (event) => {
                    const { history } = this.props;
                    event.preventDefault();
                    this.setState({
                      isLoading: true,
                    });
                    createUser({ name: userName });
                    this.setState({
                      isLoading: false,
                    });
                    history.push('/search');
                  } }
                >
                  Entrar
                </button>
              </div>
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
