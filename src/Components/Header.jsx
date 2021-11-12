import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loadOn: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    getUser()
      .then((data) => this.setState({
        userName: data.name,
        loadOn: true,
      }));
  }

  render() {
    const { userName, loadOn } = this.state;
    return (
      <header data-testid="header-component">
        { loadOn
          ? <span data-testid="header-user-name">{userName}</span>
          : <Carregando />}
      </header>
    );
  }
}

export default Header;
