import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';
import { Button, Link } from '@material-ui/core';

import styles from './PostLong.module.scss';

const Component = ({ className, userStatus, userEmail, id, title, text, created, updated, email, status, image, price, phone, location }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.header}>
      <h1>{title}</h1>

      {userStatus === 'admin' || userStatus==='logged-in' && userEmail === email
        ? <Button
          className={styles.button}
          component={Link}
          href={`/post/${id}/edit`}
          variant="outlined"
          color="inherit"
        >
          Edit post
        </Button>
        : ''
      }
    </div>

    <div className={styles.post}>
      <div className={styles.postImage}>
        {image === ''
          ? ''
          : <img src={image} alt='post-pic' />
        }
      </div>

      <div className={styles.postText}>
        <h2>Opis</h2>
        {text}
      </div>

      <div className={styles.postInfo}>
        <h2 className={styles.price}>Price: {price} zł</h2>

        <div className={styles.contactDetails}>
          <h2>Contact Info:</h2>
          <h3><a href={`mailto:${email}`}>{email}</a></h3>
          <h3><a href={`https://www.google.com/search?q=${phone}`}>{phone}</a></h3>
          <h3><a href={`https://www.google.com/maps/place/${location}`}>Location: {location}</a></h3>
        </div>

        <div className={styles.postData}>
          <p>Status: {status}</p>
          <p>Added: {created}</p>
          <p>Last updated: {updated}</p>
        </div>
      </div>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  phone: PropTypes.number,
  location: PropTypes.string,
};

const mapStateToProps = state => ({
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostLong,
  Container as PostLong,
  Component as PostLongComponent,
}; 