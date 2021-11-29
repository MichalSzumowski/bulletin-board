import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPosts } from '../../../redux/postsRedux';
import { getUserStatus } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';
import { PostShort } from '../PostShort/PostShort';
import { Button, Link } from '@material-ui/core';

const Component = ({ className, posts, userStatus }) => {

  fetchPosts();

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.header}>
        <h1>Post Table</h1>
        <div>
          {userStatus === 'not-logged-in'
            ? ''
            : <Button
              className={styles.button}
              component={Link}
              href='/post/add'
              variant="outlined"
              color="inherit"
              size="large"
            >
          + Add new post
            </Button>
          }
        </div>
      </div>
    
      {posts 
        .sort((a, b) => (
          new Date(b.updated) - new Date(a.updated)
        ))
        .map(post => (
          console.log(posts),
          <PostShort key={post.id} {...post} />
        ))}
    </div>
  );
};


Component.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
  userStatus: PropTypes.string,

  fetchPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
