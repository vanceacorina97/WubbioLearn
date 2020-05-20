import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './utils/history';
import MainLayout from './modules/MainLayout'
import { LoginContainer } from './modules/login/LoginContainer';
import PrivateRoute from './components/PrivateRoute'
import { ProjectPage } from './pages/ProjectsPage'
import { Test } from './modules/Test'
import { PhotosPage } from './pages/PhotosPage';
import { AddProjectPage } from './pages/AddProjectPage';

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <PrivateRoute exact path="/" component={MainLayout} />
          <PrivateRoute exact path="/projects" component={ProjectPage} />
          <PrivateRoute exact path="/photos" component={PhotosPage} />
          <PrivateRoute exact path="/add/project" component={AddProjectPage} />
          <Route exact path='/test' component={Test} />
        </Switch>
      </Router>
    );
  }
}

export default App;