import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
    this.state = {
      favoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  handleFavorites(song) {
    const { favoriteSongs } = this.state;
    const newFavoriteSongs = favoriteSongs.filter((s) => s.trackId !== song.trackId);
    this.setState({
      favoriteSongs: newFavoriteSongs,
    });
  }

  async fetchFavoriteSongs() {
    this.setState({
      favoriteSongs: getFavoriteSongs(),
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div>
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <section className="flex gap-12 justify-center items-center p-12 flex-wrap">
                {
                  favoriteSongs.length > 0 ? favoriteSongs.map((song) => (
                    <MusicCard
                      key={ song.trackId }
                      music={ song }
                      favoriteSongs={ favoriteSongs }
                      handleFavorites={ () => {
                        this.handleFavorites(song);
                      } }
                    />
                  ))
                    : (
                      <h2 className="font-bold text-stone-600">
                        Parece
                        que você ainda não
                        favoritou nenhuma música, experimente clicar em Pesquisar!
                      </h2>
                    )
                }
              </section>
            </>
          )
        }
      </div>
    );
  }
}

export default Favorites;
