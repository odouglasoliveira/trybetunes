import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';
import searchSVG from '../images/lupa.svg';
import starSVG from '../images/estrela.svg';
import profileSVG from '../images/defaultProfile.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
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
    });
  }

  render() {
    const { name } = this.state;
    return (
      <header data-testid="header-component">
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
      </header>
    );
  }
}

export default Header;
