import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Hero,
  Card,
} from '../../components/shared';

/**
 * @class
 */
export default class Landing extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      menus: [1, 2, 3, 4, 5, 6],
    };
  }

  /**
   * @returns {JSX} Landing JSX
   */
  render() {
    const { menus } = this.state;
    return (
      <Fragment>
        <Navbar />
        <Hero />
        <section className="section wrapper">
          <div className="section__inner">
            <div className="title mt-2">
              <h2 className="title__text title__text--dark">Menu Items</h2>
            </div>
            <div id="card" className="section__row three-col">
              {menus.map((menu, i) => <Card key={i} />)}
            </div>
            <div className="section__row load-more mt-5">
              <Link
                to="/order"
                className="button button--primary"
              >Show All Items</Link>
            </div>
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
        <footer className="bg-dark text--white text--center">
          <p>Copyrights @ 2018</p>
        </footer>
      </Fragment>
    );
  }
}
