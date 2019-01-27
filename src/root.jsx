import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';
import './styles/css/ionicons.min.css'
import './styles/css/core.min.css';
import './styles/css/toast.min.css';

/**
 * @class
 */
class Root extends Component {
  /**
   * @returns {JSX} JSX
   */
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Switch>
              {routes}
            </Switch>
          </Fragment>
      </BrowserRouter>
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('app-mount'));
