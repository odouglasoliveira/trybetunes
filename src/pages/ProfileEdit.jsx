import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';
import verifyInputs from '../services/verifyInputs';
import defaultProfilePhoto from '../images/do-utilizador.png';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.fetchUser = this.fetchUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isDisabled: true,
      isLoading: true,
      description: '',
      email: '',
      name: '',
      image: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.setState({
      isDisabled: this.verifyButton(),
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { name, description, email, image } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    updateUser({
      name,
      description,
      email,
      image,
    });
    history.push('/profile');
  }

  handleInput(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verifyButton();
    });
  }

  verifyButton() {
    const { name, description, email } = this.state;
    this.setState({
      isDisabled: verifyInputs(name, description, email),
    });
  }

  fetchUser() {
    const userData = getUser();
    const defaultUser = userData.email === 'exemplo@email.com';
    this.setState({
      description: defaultUser ? '' : userData.description,
      email: defaultUser ? '' : userData.email,
      name: userData.name,
      image: defaultUser ? defaultProfilePhoto : userData.image,
      isLoading: false,
    });
  }

  render() {
    const { isDisabled, isLoading, description, email, name } = this.state;
    return (
      <section className="flex flex-col justify-center items-center">
        {
          isLoading ? (
            <>
              <Header />
              <Loading />
            </>
          ) : (
            <>
              <Header />
              <form
                className="flex flex-col gap-6
                border mt-48 w-96 h-96
                items-center justify-center"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  className="border border-gray-500
                  rounded-md text-center
                  outline-none p-2"
                  value={ name }
                  onChange={ this.handleInput }
                />
                <input
                  type="email"
                  name="email"
                  className="border border-gray-500
                  rounded-md text-center
                  outline-none p-2"
                  placeholder="Email"
                  value={ email }
                  onChange={ this.handleInput }
                />
                <input
                  type="text"
                  name="description"
                  className="border border-gray-500
                  rounded-md text-center
                  outline-none p-2"
                  placeholder="Descrição"
                  value={ description }
                  onChange={ this.handleInput }
                />
                <input
                  type="text"
                  name="image"
                  className="border border-gray-500
                  rounded-md text-center outline-none p-2"
                  placeholder="Insira um link de imagem"
                  value=""
                  onChange={ this.handleInput }
                />
                <button
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                  className="bg-emerald-500 text-white
                  w-5/6 h-12
                  rounded-md text-xl
                  disabled:opacity-50
                  enabled:hover:bg-emerald-600
                  transition
                  duration-200"
                >
                  Salvar
                </button>
              </form>
            </>
          )
        }
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
