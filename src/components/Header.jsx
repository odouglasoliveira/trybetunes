import { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

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
        <Loading />
      ) : (
        <header data-testid="header-component">
          <h2 data-testid="header-user-name">
            { name }
          </h2>
          <section className="links-section">
            <Link
              to="/search"
              data-testid="link-to-search"
              style={ { textDecoration: 'none' } }
            >
              <div>Pesquisar</div>
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              style={ { textDecoration: 'none' } }
            >
              <div>Favoritas</div>
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              style={ { textDecoration: 'none' } }
            >
              <div>Meu Perfil</div>
            </Link>
          </section>
        </header>
      )
    );
  }
}

export default Header;
