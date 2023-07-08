import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
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
      <header className="bg-emerald-500 w-screen">
        <h2 className="text-white text-2xl font-bold text-center py-2">
          {`Bem vindo, ${name}!`}
        </h2>
        <section
          className="flex-row py-2
          flex-wrap w-100
          flex justify-center
          gap-6 text-emerald-500"
        >
          <Link
            to="/search"
            style={ { textDecoration: 'none' } }
          >
            <div
              className="hover:scale-105
              transition duration-200
              flex justify-center p-2 gap-1
              rounded-lg bg-white w-36 h-10"
            >
              <img src={ searchSVG } alt="Icone de Pesquisa" />
              Pesquisar
            </div>
          </Link>
          <Link
            to="/favorites"
            style={ { textDecoration: 'none' } }
          >
            <div
              className="hover:scale-105
              transition duration-200
              flex justify-center
              p-2 gap-1 rounded-lg
              bg-white w-36 h-10"
            >
              <img src={ starSVG } alt="Icone de Favoritas" />
              Favoritas
            </div>
          </Link>
          <Link
            to="/profile"
            style={ { textDecoration: 'none' } }
          >
            <div
              className="hover:scale-105
              transition duration-200
              flex justify-center
              p-2 gap-1 rounded-lg
              bg-white w-36 h-10"
            >
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
