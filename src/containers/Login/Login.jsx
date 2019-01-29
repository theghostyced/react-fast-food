/* eslint-disable react/no-unescaped-entities */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import swal from 'sweetalert';
import './Login.css';
import loginActions from './actions/auth';
import foodTruck from '../../styles/img/food-truck.png';
import decodeToken from '../../helpers/utils';

/**
 * @class
 */
export class Login extends Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  static propTypes = {
    loginDispatcher: PropTypes.func,
    history: PropTypes.object,
    errorMessage: PropTypes.string,
    error: PropTypes.bool,
    isLoading: PropTypes.bool,
  }

  /**
   * @returns{void}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#580072';
    const isAuthenticated = decodeToken();
    if (isAuthenticated) this.props.history.push('/order');
  }

  /**
   * @param {object} e - The Event object
   * @returns {void}
   * @memberof Login
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { loginDispatcher } = this.props;
    loginDispatcher(this.state.user, this.props.history);
  };

  /**
    * @description - Takes care of toast notifications when component updates
    * @param {object} nextProps - The next/new props of the component
    * @returns {bool} - Boolean
    */
  shouldComponentUpdate(nextProps) {
    // eslint-disable-next-line max-len
    if (nextProps.error !== this.props.error && nextProps.error && nextProps.errorMessage) {
      swal({
        title: 'Login Failed',
        text: nextProps.errorMessage,
        icon: 'error',
      });
      return false;
    }
    return true;
  }

  /**
   * @param {object} e - The Event object
   * @returns {void} - No return
   * @memberof Login
   * @description Handles input changes
   */
  handleInputChange = (e) => {
    e.preventDefault();
    const { user } = this.state;

    this.setState({
      user: {
        ...user,
        [e.target.id]: e.target.value,
      },
    });
  }

  /**
   * @returns {JSX} Login JSX
   */
  render() {
    const { isLoading } = this.props;
    return (
      <Fragment>
        <div className="wrapper">
          <div className="login">
            <div className="login__logo__container">
              <div className="login__logo">
                <Link to="/"><img src={foodTruck} /></Link>
              </div>
            </div>
            <form>
              <div className="input-group">
                <span className="input__icon">
                  <i className="icon ion-ios-email vi"></i>
                </span>
                <input
                  onChange={this.handleInputChange}
                  className="email"
                  type="email"
                  name="Email"
                  placeholder="Email"
                  id="email"
                />
              </div>
              <div className="input-group">
                <span className="input__icon">
                  <i className="icon ion-ios-locked vi"></i>
                </span>
                <input
                  onChange={this.handleInputChange}
                  className="password"
                  type="password"
                  name="Email"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="input-button">
                <button
                  className="button button--secondary"
                  onClick={this.handleSubmit}
                >
                {
                  !this.props.isLoading
                    ? 'Login'
                    : <ClipLoader
                  sizeUnit={'px'}
                  size={32}
                  color={'#fff'}
                  loading={true}
                />
                }
                </button>
              </div>
              <div className="input-account">
                <p> Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
              <Link className="input-forgot" to="#">Forgot your password?</Link>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.auth,
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  loginActions,
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
