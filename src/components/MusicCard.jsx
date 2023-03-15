import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  render() {
    const { music } = this.props;
    const { previewUrl, collectionName, trackName, trackId } = music;
    const { isLoading, checked } = this.state;
    return (
      <div>
        {
          isLoading ? (
            <Loading />
          ) : (
            <section className="music-card">
              <p className="album-name">
                { collectionName }
              </p>
              <p className="song-name">
                { trackName }
              </p>
              <label
                htmlFor="favorite-input"
                className="favorite-input-label"
              >
                <input
                  type="checkbox"
                  name="favorite-input"
                  checked={ checked }
                  data-testid={ `checkbox-music-${trackId}` }
                  onClick={ async () => {
                    this.setState({
                      isLoading: true,
                    });
                    await addSong(music);
                    this.setState({
                      isLoading: false,
                      checked: true,
                    });
                  } }
                />
                Favorita
              </label>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
            </section>
          )
        }
      </div>
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
};

export default MusicCard;
