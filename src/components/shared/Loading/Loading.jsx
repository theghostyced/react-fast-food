import React from 'react';
import PropTypes from 'prop-types';
import loaderImg from '../../../styles/img/loaders/bars.svg';
import './Loading.css';

const Loading = props => (
  <div className={` loading ${props.isLoading ? 'loading--show' : ''} `}>
    <img src={loaderImg} />
  </div>
);

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
