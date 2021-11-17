import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      isCheckboxDisabled: false,
    };
  }

  saveFavoriteSongs = () => {
    const { music } = this.props;
    this.setState({ showLoading: true });
    addSong(music).then(() => {
      this.setState({ showLoading: false });
    });
  }

  handleCheckbox = () => {
    this.setState({ isCheckboxDisabled: true }, () => {
      this.saveFavoriteSongs();
    });
  }

  render() {
    const {
      trackName,
      previewUrl,
      key,
      trackId,
    } = this.props;

    const {
      isCheckboxDisabled,
      showLoading,
    } = this.state;

    return (
      <div>
        {showLoading
          ? <Carregando />
          : (
            <>
              <h3>{ trackName }</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ key }>
                Favorita
                <input
                  id={ key }
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ isCheckboxDisabled }
                  onChange={ this.handleCheckbox }
                />
              </label>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  music: PropTypes.shape().isRequired,
};

export default MusicCard;
