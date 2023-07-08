import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      musics: [],
      artistName: '',
      collectionName: '',
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.fetchMusic(id);
  }

  handleFavorites(song) {
    const { favoriteSongs } = this.state;
    const newFavoriteSongs = favoriteSongs.filter((s) => s.trackId !== song.trackId);
    this.setState({
      favoriteSongs: newFavoriteSongs,
    });
  }

  async fetchMusic(id) {
    const musics = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = await musics[0];
    this.setState({
      musics,
      artistName,
      collectionName,
      favoriteSongs: await getFavoriteSongs(),
      artworkUrl100,
    });
  }

  render() {
    const { isLoading,
      musics,
      artistName,
      collectionName,
      favoriteSongs,
      artworkUrl100 } = this.state;
    return (
      <div data-testid="page-album">
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <section
                className="shadow-2xl
                flex flex-row
                h-48 border
                justify-around items-center"
              >
                <div>
                  <img className="w-32" src={ artworkUrl100 } alt="" />
                </div>
                <div className="text-center font-medium text-2xl">
                  <p
                    data-testid="artist-name"
                  >
                    { artistName }
                  </p>
                  <p
                    data-testid="album-name"
                  >
                    { collectionName }
                  </p>
                </div>
              </section>
              <section className="flex flex-wrap flex-row gap-12 p-12 justify-center">
                { musics.slice(1).map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    music={ music }
                    favoriteSongs={ favoriteSongs }
                    handleFavorites={ () => {
                      this.handleFavorites(music);
                    } }
                  />
                )) }
              </section>
            </>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
