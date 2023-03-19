import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';
import verifyInputs from '../services/verifyInputs';
import './ProfileEdit.css';

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
    await updateUser({
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

  async fetchUser() {
    const userData = await getUser();
    this.setState({
      description: userData.description,
      email: userData.email,
      name: userData.name,
      image: userData.image,
      isLoading: false,
    });
  }

  render() {
    const { isDisabled, isLoading, description, email, name, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {
          isLoading ? (
            <>
              <Header />
              <Loading />
            </>
          ) : (
            <>
              <Header />
              <section className="edit-form">
                <form>
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    name="name"
                    placeholder="Nome"
                    value={ name }
                    onChange={ this.handleInput }
                  />
                  <input
                    type="email"
                    data-testid="edit-input-email"
                    name="email"
                    placeholder="Email"
                    value={ email }
                    onChange={ this.handleInput }
                  />
                  <input
                    type="text"
                    data-testid="edit-input-description"
                    name="description"
                    placeholder="Descrição"
                    value={ description }
                    onChange={ this.handleInput }
                  />
                  <input
                    type="text"
                    data-testid="edit-input-image"
                    name="image"
                    placeholder="Insira um link de imagem"
                    value={ image }
                    onChange={ this.handleInput }
                  />
                  <button
                    data-testid="edit-button-save"
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
