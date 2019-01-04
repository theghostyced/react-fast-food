import React, { Fragment } from 'react'

const Hero = (props) => (
  <Fragment>
    <section className="hero hero--bg-img">
      <div className="hero__caption">
        <div className="hero__caption-title">
          <h1 className="title__text hero__title text--shadow">Discover new meals</h1>
          <span className="seperator text--shadow">and</span><br />
          <div className="subtitle text--shadow">
            order
            <span>online</span>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default Hero;
