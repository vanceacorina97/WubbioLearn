import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Test from './Test';
import Example from './Example'
import MainLayout from './modules/MainLayout'

class App extends React.Component {
  
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path="/example" component={Example} />
          <Route exact path="/mainLayout" component={MainLayout} />
        </Switch>
      </Router>
    );
  }
}

export default App;