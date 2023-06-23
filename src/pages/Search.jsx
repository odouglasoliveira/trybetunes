import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      artistName: '',
      isSearchButtonDisabled: true,
      isLoading: false,
      hasAlbuns: true,
      albuns: [],
      searchedName: '',
      wasSearched: false,
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
    const { artistName,
      isSearchButtonDisabled,
      isLoading,
      hasAlbuns,
      albuns,
      searchedName,
      wasSearched,
    } = this.state;

    return (
      <div className="page-search">
        <Header />
        <section className="form-section">
          {
            isLoading ? (
              <Loading />
            ) : (
              <form className="search-form">
                <input
                  type="text"
                  className="search-artist-input"
                  placeholder="Nome do artista"
                  onChange={ this.handleInput }
                  value={ artistName }
                />
                <button
                  className="search-artist-button"
                  disabled={ isSearchButtonDisabled }
                  onClick={ async (event) => {
                    event.preventDefault();
                    this.setState({
                      artistName: '',
                      isLoading: true,
                    });
                    const response = await searchAlbumsAPI(artistName);
                    this.setState({
                      albuns: response,
                      isLoading: false,
                      hasAlbuns: true,
                      searchedName: artistName,
                      wasSearched: true,
                    });
                    if (response.length === 0) {
                      this.setState({
                        hasAlbuns: false,
                      });
                    }
                  } }
                >
                  Pesquisar
                </button>
              </form>
            )
          }
        </section>
        {
          hasAlbuns ? (
            <>
              {
                wasSearched ? (
                  <h2
                    className="album-section-title"
                  >
                    {`Resultado de álbuns de: ${searchedName}`}
                  </h2>
                ) : (
                  <>
                  </>
                )
              }
              <section className="album-section">
                {
                  albuns.map((album, index) => (
                    <AlbumCard
                      key={ index }
                      artistName={ album.artistName }
                      albumName={ album.collectionName }
                      albumImage={ album.artworkUrl100 }
                      collectionId={ album.collectionId }
                    />
                  ))
                }
              </section>
            </>
          ) : (
            <section>
              <h2 className="no-album">Nenhum álbum foi encontrado.</h2>
            </section>
          )
        }
      </div>
    );
  }
}

export default Search;
