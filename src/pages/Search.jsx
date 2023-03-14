import { Component } from 'react';
import Header from '../components/Header';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      artistName: '',
      isSearchButtonDisabled: true,
    };
  }

  handleInput({ target }) {
    const { value } = target;
    let isSearchButtonDisabled = true;
    const minChar = 2;
    this.setState({
      artistName: value,
    });
    if (value.trim().length >= minChar) {
      isSearchButtonDisabled = false;
      this.setState({
        isSearchButtonDisabled,
      });
    }
    this.setState(() => ({
      isSearchButtonDisabled,
    }));
  }

  render() {
    const { artistName, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <section className="form-section">
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              className="search-artist-input"
              placeholder="Nome do artista"
              onChange={ this.handleInput }
              value={ artistName }
            />
            <button
              data-testid="search-artist-button"
              className="search-artist-button"
              disabled={ isSearchButtonDisabled }
            >
              Pesquisar
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Search;
