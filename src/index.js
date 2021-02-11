import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from "./theme";
import {ThemeProvider} from '@material-ui/core/styles'
import {Provider} from "mobx-react";
import {museumStore} from "./store/MuseumStore";
import {userStore} from "./store/UserStore";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./pages/Signin";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Museums from "./pages/Museums";
import {isExpired} from "react-jwt";
import {Redirect} from 'react-router-dom'
import {Component} from "react";
import MuseumDetails from "./pages/MuseumDetails";

function PrivateRoute ({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                !isExpired(localStorage.getItem('JWT')) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function PublicRoute ({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('JWT') === undefined || localStorage.getItem('JWT') === '' || isExpired(localStorage.getItem('JWT')) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}


ReactDOM.render(
  <ThemeProvider theme={theme}>
      <Provider museumStore={museumStore} userStore={userStore}>
          <Router>
              <Switch>
                  <PublicRoute exact path={'/signin'} component={Login}/>
                  <PublicRoute exact path={'/signup'} component={Signup}/>
                  <PrivateRoute exact path={'/profile'} component={UserProfile} />
                  <Route exact path={'/'}>
                      <Museums/>
                  </Route>
                  <Route exact path={'/museum/:id'}><MuseumDetails/> </Route>
              </Switch>
          </Router>
      </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

