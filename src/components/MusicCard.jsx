import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import yellowStar from '../images/yellowstar.png';
import emptyStar from '../images/empty.png';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { music, favoriteSongs } = this.props;
    const { trackId } = music;
    if (favoriteSongs.some((song) => song.trackId === trackId)) {
      this.setState({
        checked: true,
      });
    }
  }

  render() {
    const { music, handleFavorites } = this.props;
    const { previewUrl, trackName, artworkUrl100 } = music;
    const { isLoading, checked } = this.state;
    return (
      <section className="border-2 p-4 rounded-2xl shadow-2xl w-72">
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="image-container">
                <img
                  className="w-12 z-0 shadow-inner"
                  src={ artworkUrl100 }
                  alt=""
                />
                <div className="image-overlay w-12" />
              </div>
              <p
                className="relative bottom-12 text-center z-1
                text-white font-bold shadow-2xl max-w-xs"
              >
                { trackName }
              </p>
              <div className="flex">
                <audio src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                </audio>
                <button
                  name="favorite-input"
                  className="w-8"
                  onClick={ async () => {
                    if (checked) {
                      removeSong(music);
                      handleFavorites(music);
                      this.setState({
                        checked: false,
                      });
                    } else {
                      addSong(music);
                      this.setState({
                        checked: true,
                      });
                    }
                  } }
                >
                  {checked
                    ? <img src={ yellowStar } alt="Botão de desfavoritar" />
                    : <img src={ emptyStar } alt="Botão de favoritar" /> }
                </button>
              </div>

            </>
          )
        }
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
  favoriteSongs: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  handleFavorites: PropTypes.func.isRequired,
};

export default MusicCard;
