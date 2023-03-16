import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async fetchFavoriteSongs() {
    this.setState({
      favoriteSongs: await getFavoriteSongs(),
      isLoading: false,
    });
  }

  render() {
    this.fetchFavoriteSongs();
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <section>
                {
                  favoriteSongs.map((song) => (
                    <MusicCard
                      key={ song.trackId }
                      music={ song }
                      favoriteSongs={ favoriteSongs }
                    />
                  ))
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
