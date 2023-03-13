import { Component } from 'react';
import Loading from './Loading';
// import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  // async showUser() {
  //   const { name } = await getUser();
  //   this.setState({
  //     isLoading: false,
  //   });
  //   return name;
  // }

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? (
        <Loading />
      ) : (
        <header data-testid="header-component">
          <div>
            Bem vindo
          </div>
        </header>
      )
    );
  }
}

export default Header;
