import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singerName: '',
      buttonDisabled: true,
    };
  }

  getSinger = (event) => {
    const { value } = event.target;
    this.setState({ singerName: value }, () => {
      this.setState({ buttonDisabled: this.disabledButton() });
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

  render() {
    const { buttonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        Pagina de Search
        <form>
          <label htmlFor="search-artist-input">
            Login
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
            onClick={ this.getSinger }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
