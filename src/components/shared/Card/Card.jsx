/* eslint-disable valid-jsdoc */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 */
export class Card extends Component {
  /**
   * @returns {void}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  static propTypes = {
    price: PropTypes.any,
    img: PropTypes.any,
    name: PropTypes.any,
  }

  /**
   *@returns {void}
   *
   * @memberof Card
   */
  handleClick = (e) => {
    e.preventDefault();
    const currentState = this.state.clicked;
    this.setState({ clicked: !currentState });
  }

  /**
   * @returns {JSX} JSX
   */
  render() {
    const clickedState = this.state.clicked;
    return (
      <Fragment>
      <div className="card card--vertical card--has-shadow card--shape grid-item mt-4">
        <div className="card__image">
          <img src={this.props.img} />
        </div>
        <div className="card__content">
          <div className="card__title">
            <h3 className="card__title--text text--capitalise title__text--dark pt-1">{this.props.name}</h3>
          </div>
          <div className="card__price">
            <span>&#8358; {this.props.price}</span>
          </div>
          <div className="card__button">
            <a
            href="#"
            className={clickedState ? 'button button--secondary button--clicked' : 'button button--secondary'}
            onClick={this.handleClick}>Added Item</a>
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default Card;
