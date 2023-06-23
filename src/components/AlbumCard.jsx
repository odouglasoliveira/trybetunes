import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { artistName, albumName, albumImage, collectionId } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        style={ { textDecoration: 'none' } }
      >
        <section className="albumCard">
          <img src={ albumImage } alt={ albumName } />
          <section className="description-section">
            <p>{ albumName }</p>
            <p>{ artistName }</p>
          </section>
        </section>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumImage: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbumCard;
