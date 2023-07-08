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

  fetchUser() {
    const userData = getUser();
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
      <div className="flex h-full flex-col justify-center items-center">
        {
          isLoading ? (
            <>
              <Header />
              <Loading />
            </>
          ) : (
            <>
              <Header />
              <section
                className="flex flex-col w-full justify-center items-center h-full"
              >
                <section className="flex flex-row items-center justify-around w-3/6">
                  <img
                    className="w-24 rounded-full"
                    src={ image }
                    alt={ name }
                  />
                  <button
                    className="w-32 h-12 border border-emerald-500
                    px-6 rounded-md hover:bg-emerald-500
                    transition duration-200 hover:text-white"
                    onClick={ this.redirectProfile }
                  >
                    Editar perfil
                  </button>
                </section>
                <section
                  className="h-5/6 w-3/6
                  flex flex-col gap-6
                  text-center text-emerald-500
                  p-6 justify-center items-center"
                >
                  <div>
                    <h3>Nome:</h3>
                    <p>{ name }</p>
                  </div>
                  <div>
                    <h3>E-mail:</h3>
                    <p>{ email }</p>
                  </div>
                  <div>
                    <h3>Descrição:</h3>
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
