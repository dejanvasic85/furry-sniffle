import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Campaigns from './pages/Campaigns';

class App extends React.Component {
  render() {
    return <>
      <Route path="/" exact component={Home} />
      <Route path="/clients" component={Clients} />
      <Route path="/campaigns" component={Campaigns} />
    </>
  }
}

export default App;