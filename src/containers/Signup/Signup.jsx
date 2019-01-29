import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import swal from 'sweetalert';
import './Signup.css';
import foodTruck from '../../styles/img/food-truck.png';
import signupActions from './actions/signup';
import decodeToken from '../../helpers/utils';

/**
 * @class
 */
export class Signup extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isAuthenicated: !!decodeToken(),
    };
  }

  static propTypes = {
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    history: PropTypes.object,
    signupDispatcher: PropTypes.func,
    isLoading: PropTypes.bool,
  }

  state = {
    user: {
      email: '',
      password: '',
      address: '',
    },
  };

  /**
   * @param {object} e - The Event object
   * @returns {void}
   * @memberof Login
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { signupDispatcher } = this.props;
    signupDispatcher(this.state.user, this.props.history);
  };

  /**
   * @returns{void}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#580072';
    const isAuthenticated = decodeToken();
    if (isAuthenticated) this.props.history.push('/order');
  }

  /**
    * @description - Takes care of toast notifications when component updates
    * @param {object} nextProps - The next/new props of the component
    * @returns {bool} - Boolean
    */
  shouldComponentUpdate(nextProps) {
    // eslint-disable-next-line max-len
    if (nextProps.error !== this.props.error && nextProps.error && nextProps.errorMessage) {
      swal({
        title: 'Signup Failed',
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
   * @memberof Signup
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
   * @returns {JSX} Signup JSX
   */
  render() {
    return (
      <div className="wrapper">
        <div className="signup">
          <div className="signup__logo__container">
              <div className="signup__logo">
                  <Link to="/"><img src={foodTruck} /></Link>
              </div>
          </div>
          <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                  <span className="input__icon">
                    <i className="icon ion-ios-email"></i>
                  </span>
                  <input
                    type="email"
                    name="Email"
                    id="email"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                  />
              </div>
              <div className="input-group">
                  <span className="input__icon">
                    <i className="icon ion-ios-locked"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                  />
              </div>
              <div className="input-group">
                  <span className="input__icon">
                    <i className="icon ion-map"></i>
                  </span>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    onChange={this.handleInputChange}
                  />
              </div>
              <div className="input-button">
                  <button
                    type="submit"
                    className="button button--secondary"
                  >{
                    !this.props.isLoading && 'Signup'
                  }
                  <ClipLoader
                    sizeUnit={'px'}
                    size={32}
                    color={'#fff'}
                    loading={this.props.isLoading}
                  /></button>
              </div>
              <div className="input-account">
                  <p> Already have an account?
                    <Link to="/login">Login</Link>
                  </p>
              </div>
              <Link className="input-forgot" to="/">Forgot your password?</Link>
          </form>
        </div>
    </div>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.signup,
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  signupActions,
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
