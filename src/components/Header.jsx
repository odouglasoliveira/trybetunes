import { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import searchSVG from '../images/lupa.svg';
import starSVG from '../images/estrela.svg';
import profileSVG from '../images/defaultProfile.svg';
import { StyledHeader } from '../styles/styles';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.saveNameState();
  }

  async saveNameState() {
    const { name } = await getUser();
    this.setState({
      name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    return (
      isLoading ? (
        <StyledHeader>
          <Loading />
        </StyledHeader>
      ) : (
        <StyledHeader data-testid="header-component">
          <h2 data-testid="header-user-name">
            {`Bem vindo, ${name}!`}
          </h2>
          <section className="links-section">
            <Link
              to="/search"
              data-testid="link-to-search"
              style={ { textDecoration: 'none' } }
            >
              <div className="search-link">
                <img src={ searchSVG } alt="Icone de Pesquisa" />
                Pesquisar
              </div>
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              style={ { textDecoration: 'none' } }
            >
              <div className="favorites-link">
                <img src={ starSVG } alt="Icone de Favoritas" />
                Favoritas
              </div>
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              style={ { textDecoration: 'none' } }
            >
              <div className="profile-link">
                <img src={ profileSVG } alt="Icone do Perfil" />
                Meu Perfil
              </div>
            </Link>
          </section>
        </StyledHeader>
      )
    );
  }
}

export default Header;
