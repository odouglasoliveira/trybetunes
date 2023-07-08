import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';
import verifyInputs from '../services/verifyInputs';

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
      image: defaultUser ? '' : userData.image,
      isLoading: false,
    });
  }

  render() {
    const { isDisabled, isLoading, description, email, name, image } = this.state;
    return (
      <div>
        {
          isLoading ? (
            <>
              <Header />
              <section className="edit-form">
                <Loading />
              </section>
            </>
          ) : (
            <>
              <Header />
              <section className="edit-form">
                <form>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={ name }
                    onChange={ this.handleInput }
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={ email }
                    onChange={ this.handleInput }
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={ description }
                    onChange={ this.handleInput }
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Insira um link de imagem"
                    value={ image }
                    onChange={ this.handleInput }
                  />
                  <button
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                  >
                    Salvar
                  </button>
                </form>
              </section>
            </>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
