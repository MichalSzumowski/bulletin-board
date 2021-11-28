import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostShort.module.scss';
import { Link } from '@material-ui/core';

const Component = ({ id, className, title, image, price }) => (
  <div className={clsx(className, styles.root)}>
    <Link className={styles.postLink} href={`/post/${id}`} >
      <div className={styles.postImage}>
        {image === ''
          ? '' 
          : <img src={image} alt='post-pic' />
        }
      </div>
      <div className={styles.postInfo}>
        <h2>{title}</h2>
        <h2>{price} $</h2>
      </div>
    </Link>
  </div>
);

Component.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  lastUpdate: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostShort,
  // Container as Post,
  Component as PostShortComponent,
};
