import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import decodeToken from '../../helpers/utils';
import { Navbar } from '../../components/shared';

/**
 * @class
 */
export default class Admin extends Component {
  static propTypes = {
    history: PropTypes.object,
    fetchOrderDispatcher: PropTypes.func,
    menus: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPrice: PropTypes.number,
    updateCartTotalDispatcher: PropTypes.func,
  }

  /**
   * @returns{void}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#EFF4F5';
    const isAuthenticated = decodeToken();
    if (!isAuthenticated) this.props.history.push('/login');
    this.props.fetchOrderDispatcher();
  }

  /**
   * @returns {JSX} JSX
   */
  render() {
    return (
      <Fragment>
        <Navbar isAuthenicated={true}/>
      </Fragment>
    );
  }
}
