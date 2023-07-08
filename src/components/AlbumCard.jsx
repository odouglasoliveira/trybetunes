import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { artistName, albumName, albumImage, collectionId } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
        style={ { textDecoration: 'none', width: '300px' } }
      >
        <section
          className="flex flex-row rounded-md
          border w-full justify-around
          gap-6 p-6 shadow-2xl"
        >
          <img className="object-none" src={ albumImage } alt={ albumName } />
          <section
            className="flex flex-col
            items-center justify-center
            text-emerald-600
            font-bold"
          >
            <p className="text-center">{ albumName }</p>
            <p className="text-center">{ artistName }</p>
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
