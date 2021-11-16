import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../Components/Carregando';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singerName: '',
      searchName: '',
      buttonDisabled: true,
      singerInfos: [],
      verifyApi: true,
      returnMsg: '',
      showResult: false,
    };
  }

  getSinger = (event) => {
    const { value } = event.target;
    this.setState({ singerName: value }, () => {
      this.setState({
        buttonDisabled: this.disabledButton(),
        searchName: value,
      });
    });
  }

  disabledButton = () => {
    const { singerName } = this.state;
    const TWO = 2;
    if (singerName.length >= TWO) {
      return false;
    }
    return true;
  }

  getInfoArtista = (event) => {
    event.preventDefault();
    const { searchName } = this.state;
    this.setState({
      singerName: '',
      verifyApi: false,
    }, () => {
      searchAlbumsAPI(searchName).then((data) => {
        this.setState({
          singerInfos: [...data],
          verifyApi: true,
          showResult: true,
        }, () => this.showMsg());
      });
    });
  }

  showMsg = () => {
    const { singerInfos, searchName } = this.state;
    if (singerInfos.length > 0) {
      this.setState({ returnMsg: `Resultado de álbuns de: ${searchName}` });
    } else {
      this.setState({ returnMsg: 'Nenhum álbum foi encontrado' });
    }
  }

  render() {
    const {
      buttonDisabled,
      verifyApi,
      returnMsg,
      showResult,
      singerInfos,
    } = this.state;

    return (
      <>
        <div data-testid="page-search">
          <Header />
          Pagina de Search
          {
            verifyApi
              ? (
                <form>
                  <label htmlFor="search-artist-input">
                    Buscar
                    <input
                      type="text"
                      data-testid="search-artist-input"
                      minLength="2"
                      onChange={ this.getSinger }
                    />
                  </label>
                  <button
                    disabled={ buttonDisabled }
                    data-testid="search-artist-button"
                    type="submit"
                    onClick={ this.getInfoArtista }
                  >
                    Entrar
                  </button>
                </form>)
              : <Carregando />
          }
        </div>
        <div>
          {showResult
            ? (
              <ul>
                <span>{ returnMsg }</span>
                {singerInfos.map((info) => (
                  <Link
                    to={ `/album/${info.collectionId}` }
                    data-testid={ `link-to-album-${info.collectionId}` }
                    key={ info.collectionId }
                  >
                    <img src={ info.artworkUrl100 } alt={ info.collectionName } />
                    <li>{info.collectionName}</li>
                  </Link>
                )) }
              </ul>
            )
            : <span>{ returnMsg }</span>}
        </div>
      </>
    );
  }
}

export default Search;
