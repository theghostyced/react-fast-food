import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';
import bellImage from '../../../styles/img/if_icons_notifications_1564519.svg'

const Toast = (props) => (
  <Fragment>
    <div id="toast" className={props.isShown ? 'toast--show' : ''}>
      <div id="toast__img">
        <img src={bellImage} alt="Toast Image" />
      </div>
      <div id="toast__desc">{props.children}</div>
    </div>
  </Fragment>
);

Toast.defaltProps = {
  isShown: false,
  type: 'success',
};

Toast.propTypes = {
  isShown: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default Toast;
