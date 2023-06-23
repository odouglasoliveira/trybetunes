import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.redirectProfile = this.redirectProfile.bind(this);
    this.state = {
      isLoading: true,
      description: '',
      image: '',
      email: '',
      name: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const userData = await getUser();
    this.setState({
      description: userData.description,
      image: userData.image,
      email: userData.email,
      name: userData.name,
      isLoading: false,
    });
  }

  redirectProfile() {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  render() {
    const { isLoading, description, image, email, name } = this.state;
    return (
      <div
        className="page-profile"
      >
        {
          isLoading ? (
            <>
              <Header />
              <section className="profile-section">
                <Loading />
              </section>
            </>
          ) : (
            <>
              <Header />
              <section className="profile-section">
                <section className="edit-section">
                  <img
                    src={ image }
                    alt={ name }
                    data-testid="profile-image"
                  />
                  <button onClick={ this.redirectProfile }>Editar perfil</button>
                </section>
                <section className="description-section">
                  <div>
                    <h3>Nome</h3>
                    <p>{ name }</p>
                  </div>
                  <div>
                    <h3>E-mail</h3>
                    <p>{ email }</p>
                  </div>
                  <div>
                    <h3>Descrição</h3>
                    <p>{ description }</p>
                  </div>
                </section>
              </section>
            </>
          )
        }
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
