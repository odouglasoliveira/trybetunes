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
      <div className="h-full">
        <Header />
        <section className="border flex flex-col py-5 shadow-xl items-center">
          {
            isLoading ? (
              <Loading />
            ) : (
              <form className="flex gap-2 flex-col">
                <input
                  type="text"
                  className="border
                  border-gray-400
                  text-center outline-none
                  p-1 rounded-lg"
                  placeholder="Nome do artista"
                  onChange={ this.handleInput }
                  value={ artistName }
                />
                <button
                  className="bg-emerald-500
                  text-white rounded-md
                  h-8 cursor-pointer
                  transform enabled:hover:bg-emerald-600
                  transition duration-200
                  disabled:opacity-50
                  disabled:cursor-default"
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
                      isSearchButtonDisabled: true,
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
                    className="text-emerald-500 py-4 text-center font-bold text-lg"
                  >
                    {`Resultado de álbuns de: ${searchedName}`}
                  </h2>
                ) : (
                  <>
                  </>
                )
              }
              <section
                className="flex flex-row flex-wrap justify-center items-center gap-6 p-6"
              >
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
            <h2
              className="text-emerald-500 py-4 text-center font-bold text-lg"
            >
              Nenhum álbum foi encontrado.
            </h2>
          )
        }
      </div>
    );
  }
}

export default Search;
