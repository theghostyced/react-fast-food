import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import decodeToken from '../../helpers/utils';
import adminActions from './actions/adminActions';

/**
 * @class
 */
export class Admin extends Component {
  static propTypes = {
    history: PropTypes.object,
    fetchOrderDispatcher: PropTypes.func,
    menus: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPrice: PropTypes.number,
    updateCartTotalDispatcher: PropTypes.func,
    orders: PropTypes.any,
    response: PropTypes.any,
    updateOrderDispatcher: PropTypes.func,
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
   * @param {object} e
   * @returns {void}
   */
  acceptOrder = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.parentNode.getAttribute('data-id');
    this.props.updateOrderDispatcher(parentID, 'processing');
    if (this.props.response.order) return window.location.replace('/admin-list');
  }

  /**
   * @param {object} e
   * @returns {void}
   */
  rejectOrder = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.parentNode.getAttribute('data-id');
    this.props.updateOrderDispatcher(parentID, 'cancelled');
    if (this.props.response.order) return window.location.replace('/admin-list');
  }

  /**
   * @param {object} e
   * @returns {void}
   */
  completeOrder = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.parentNode.getAttribute('data-id');
    this.props.updateOrderDispatcher(parentID, 'completed');
    if (this.props.response.order) return window.location.replace('/admin-list');
  }

  /**
   * @returns {JSX} JSX
   */
  render() {
    const { orders } = this.props;
    return (
      <Fragment>
        <div className="nav nav--light nav--shadow nav--custom">
          <ul className="nav__links nav-secondary__links">
              <li><Link to="/">Homepage</Link></li>
              <li><Link to="/order">Menu List</Link></li>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/admin-list">Admin List</Link></li>
              <li className="logout" onClick= {() => {
                localStorage.removeItem('token');
                window.location.replace('/');
              }}
              style={{ cursor: 'pointer' }}>
                <Link to="#">Logout</Link>
              </li>
          </ul>
         </div>
         <div className="admin-wrapper mt-10">
          <div className="title">
              <div className="title__text title__text--xs text--dark">Pending Orders</div>
          </div>
             {
               this.props.orders.length > 1
               && <table className="table mt-2">
               <thead>
                 <tr>
                   <th>No.</th>
                   <th>Order(s)</th>
                   <th>Address</th>
                   <th>Price</th>
                   <th>Status</th>
                   <th>Action</th>
                 </tr>
               </thead>
               <tbody>
               {
               orders.map((item, i) => <tr data-id={item.slug} key={i}>
                   <td>{i + 1}</td>
                   <td>{item.name}</td>
                   <td>{item.delivery_address}</td>
                   <td>&#8358; {item.price}</td>
                   <td>{item.status}</td>
                   <td>
                     <div className="table__buttons">
                       {
                         item.status === 'now'
                         && <Fragment>
                           <a onClick={this.acceptOrder} href="#" className="button button--success">Accept</a>
                           <a onClick={this.rejectOrder} href="#" className="button button--danger">Reject</a>
                         </Fragment>
                       }
                       {
                         item.status === 'processing'
                         && <Fragment>
                           <a onClick={this.completeOrder} href="#" className="button button--success">Complete</a>
                           <a onClick={this.rejectOrder} href="#" className="button button--danger">Cancel Order</a>
                         </Fragment>
                       }
                       {
                         item.status === 'cancelled'
                         && <Fragment>
                           <a href="#" className="text--danger">Cancelled</a>
                         </Fragment>
                       }
                       {
                         item.status === 'completed'
                         && <Fragment>
                           <a href="#" className="text--success">Delievered</a>
                         </Fragment>
                       }
                     </div>
                   </td>
                 </tr>)
               }
               </tbody>
               </table>
             }
          </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.admin
});

const mapDispatchToProps = dispatch => bindActionCreators(
  adminActions,
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
