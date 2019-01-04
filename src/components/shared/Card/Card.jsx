import React, { Component, Fragment } from 'react'
import hamburger from '../../../styles/img/meals/hamburger.png';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }
  handleClick = (e) => {
    e.preventDefault();
    const currentState = this.state.clicked;
    this.setState({ clicked: !currentState });
  }
  render() {
    const clickedState = this.state.clicked;
    return (
      <Fragment>
        <div className="card card--vertical card--has-shadow card--shape grid-item mt-4">
					<div className="card__image">
						<img src={hamburger} />
					</div>
					<div className="card__content">
						<div className="card__title">
							<h3 className="card__title--text title__text--dark pt-1">Hamburger</h3>
						</div>
						<div className="card__price">
							<span>&#8358; 3,000</span>
						</div>
						<div className="card__button">
							<a href="#" className={clickedState ? 'button button--secondary button--clicked' : 'button button--secondary'} onClick={this.handleClick}>Added Item</a>
						</div>
					</div>
				</div>
      </Fragment>
    )
  }
}

export default Card
