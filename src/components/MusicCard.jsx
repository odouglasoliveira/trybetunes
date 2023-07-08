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
    const { previewUrl, collectionName, trackName } = music;
    const { isLoading, checked } = this.state;
    return (
      <section className="music-card">
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <p className="album-name">
                { collectionName }
              </p>
              <p className="song-name">
                { trackName }
              </p>

              <button
                name="favorite-input"
                className="favorite-input"
                onClick={ async () => {
                  if (checked) {
                    await removeSong(music);
                    handleFavorites(music);
                    this.setState({
                      checked: false,
                    });
                  } else {
                    await addSong(music);
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
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
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
  }).isRequired,
  favoriteSongs: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  handleFavorites: PropTypes.func.isRequired,
};

export default MusicCard;
