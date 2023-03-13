import { Component } from 'react';
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
            {`Bem vindo, ${name}!`}
          </h2>
        </header>
      )
    );
  }
}

export default Header;
