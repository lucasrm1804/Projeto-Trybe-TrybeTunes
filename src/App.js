import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Components/Content';
import Menu from './Components/Menu';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <p>TrybeTunes</p>
          <Menu />
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
