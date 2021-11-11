import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/">Login</Link>
        <Link to="/search">Search</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/profile/edit">ProfileEdit</Link>
      </nav>
    );
  }
}

export default Menu;
