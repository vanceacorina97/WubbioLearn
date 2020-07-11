import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './utils/history';
import { LoginContainer } from './modules/login/LoginContainer';
import PrivateRoute from './components/PrivateRoute'
import { ProjectsPage } from './pages/ProjectsPage'
import { TestPage } from './pages/TestPage'
import { PhotosPage } from './pages/PhotosPage';
import { AddProjectPage } from './pages/AddProjectPage';
import { MainPage } from './pages/MainPage';
import AdminRoute from './components/AdminRoute';
import '../public/assets/css/style.css' 
import LoginRoute from './components/LoginRoute';
import { ProjectPage } from './pages/ProjectPage';
import { RegisterContainer } from './modules/register/RegisterContainer';
// import LoginRoute from './components/LoginRoute';

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <LoginRoute exact path="/login" component={LoginContainer} />
          <AdminRoute exact path="/register" component={RegisterContainer} />
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute exact path="/projects" component={ProjectsPage} />
          <PrivateRoute exact path="/photos" component={PhotosPage} />
          <PrivateRoute exact path="/add/project" component={AddProjectPage} />
          <PrivateRoute path="/projects/:projectId" component={ProjectPage} />
          <Route exact path='/test' component={TestPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;