import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';

import styles from './MyPosts.module.scss';
import { NotFound } from '../NotFound/NotFound';
import { PostShort } from '../PostShort/PostShort';
import { Button, Link } from '@material-ui/core';

const Component = ({ className, posts, userStatus, userEmail }) => (
  <div className={clsx(className, styles.root)}>
    {userStatus === 'not-logged-in'
      ? <NotFound />
      : 
      <>
        <div className={styles.header}>
          <h1>My posts</h1>
          <Button
            className={styles.button}
            component={Link}
            href='/post/add'
            variant="outlined"
            color="inherit"
            size="large"
          >
          + Add new post
          </Button>
        </div>

        {posts
          .filter(post => post.email === userEmail)
          .map(post => (
            <PostShort key={post.id} {...post} />
          ))}
      </>
    }
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as MyPosts,
  Component as MyPostsComponent,
};