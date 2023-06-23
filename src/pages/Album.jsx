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
      <div>
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <section className="artist-section">
                <div>
                  <img src={ artworkUrl100 } alt="" />
                </div>
                <div>
                  <p
                    className="artist-title"
                  >
                    { artistName }
                  </p>
                  <p
                    className="album-title"
                  >
                    { collectionName }
                  </p>
                </div>
              </section>
              <section className="musics-section">
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
