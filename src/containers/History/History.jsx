import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CartParent,
  CartHistoryItem,
  Navbar,
} from '../../components/shared';
import Loading from '../../components/shared/Loading/Loading.jsx';
import decodeToken from '../../helpers/utils';
import historyActions from './actions/history';
import dateFormatter from '../../helpers/dateFormatter';

/**
 * @class
 */
export class History extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const localCart = JSON.parse(localStorage.getItem('cart'));
    this.state = {
      isAuthenicated: !!decodeToken(),
      totalPrice: 0,
      cart: localCart || [],
    };
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    fetchHistoryDispatcher: PropTypes.func,
    history: PropTypes.object,
    orderHistory: PropTypes.any,
  }

  /**
   * @returns{void}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#EFF4F5';
    const isAuthenticated = decodeToken();
    if (!isAuthenticated) this.props.history.push('/login');
    this.props.fetchHistoryDispatcher();
  }

  /**
   * @returns {JSX} History JSX template
   */
  render() {
    const dateNow = new Date();
    return (
      <Fragment>
        <Navbar isAuthenicated={this.state.isAuthenicated}/>
        <CartParent buttonHidden={true} title="Previous Orders">
          {
            !this.props.isLoading
            && this.props.orderHistory !== 'No order history'
            && this.props.orderHistory !== null
            && this.props.orderHistory.map((item, i) => <CartHistoryItem
              key={i}
              quantity={item.qty}
              date={dateFormatter(dateNow, new Date(item.created_at))}
              price={item.price}
              name={item.name}
              imageUrl={item.img}
              id={item.slug}
              status={item.status}
            ></CartHistoryItem>)
          }

          {
            this.props.isLoading && <Loading isLoading={this.props.isLoading}/>
          }

          {
            this.props.orderHistory === 'No order history'
            && !this.props.isLoading
            && <p className="text--center pt-3 pb-2">No order history</p>
          }

        </CartParent>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.history,
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  historyActions,
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
