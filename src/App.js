import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './Components/Menu';
import Routes from './Components/Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <p>TrybeTunes</p>
          <Menu />
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
