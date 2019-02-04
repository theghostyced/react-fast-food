import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Navbar,
  Hero,
  Card,
  SideNav,
} from '../../components/shared';
import decodeToken from '../../helpers/utils';
import landingActions from './actions/landing';
import Loading from '../../components/shared/Loading/Loading.jsx';

/**
 * @class
 */
export class Landing extends Component {
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
    fetchMenuDispatcher: PropTypes.func,
    menus: PropTypes.array,
    isLoading: PropTypes.bool,
  }

  /**
   * @returns{void}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#FFF';
    this.props.fetchMenuDispatcher();
  }

  /**
   * @returns {JSX} Landing JSX
   */
  render() {
    const { isAuthenicated } = this.state;
    const { menus, isLoading } = this.props;
    return (
      <Fragment>
        <Navbar isAuthenicated={isAuthenicated}/>
        <Hero />
        <section className="section wrapper">
          <div className="section__inner">
            <div className="title mt-2">
              <h2 className="title__text title__text--dark">Menu Items</h2>
            </div>
            <div id="card" className="section__row three-col">
              {menus.map((menu, i) => <Card
                key={i}
                img={menu.img}
                price={menu.price}
                name={menu.name}
                id={i}
                 />)}
            </div>
            {
              isLoading
              && <Loading isLoading={isLoading}/>
            }
            {
              !isLoading
              && <div className="section__row load-more mt-5">
              <Link
                to="/order"
                className="button button--primary"
              >Show All Items</Link>
            </div>
            }
          </div>
        </section>
        {/* {Hero Sub Section} */}
        <section className="section section--no-p pr">
          <div className="section__img section__img-image-1">
            <div className="wrapper">
              <div className="center">
                <div className="title">
                  <h1
                    className="title__text text--white"
                  >Ready . Set . Order</h1>
                </div>
                <p
                  className="text--white text--center"
                >Orders gotten less than 20mins after booking are
                  <b>FREE</b>
                </p>
              </div>
            </div>
          </div>
        </section>
        <SideNav>
          {
            this.state.isAuthenicated
              ? <Fragment>
                  <Link to="/">Home</Link>
                  <Link to="/order">Orders</Link>
                  <Link to="/history">History</Link>
                </Fragment>
              : <Fragment>
                  <Link to="/">Home</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </Fragment>
          }
        </SideNav>
        <footer className="bg-dark text--white text--center">
          <p>Copyrights @ 2018</p>
        </footer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.landing,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  landingActions,
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
