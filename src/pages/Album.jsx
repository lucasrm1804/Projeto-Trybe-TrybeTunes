import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import musicasAPI from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.state = {
      id,
      musics: [],
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
    };
  }

  componentDidMount() {
    this.getId();
  }

  getId = () => {
    const { id } = this.state;
    musicasAPI(id).then((data) => {
      this.setState({
        artistName: data[0].artistName,
        collectionName: data[0].collectionName,
        artworkUrl100: data[0].artworkUrl100,
        musics: [...data],
      });
    });
  }

  render() {
    const {
      musics,
      artistName,
      collectionName,
      artworkUrl100,
    } = this.state;

    return (
      <div data-testid="page-album">
        Pagina de album
        <Header />
        <br />
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h2 data-testid="album-name">{ collectionName }</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        {musics.map((music, index) => (
          index === 0
            ? null
            : (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                music={ music }
              />
            )))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
