import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPosts } from '../../../redux/postsRedux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';

import { Button, Link } from '@material-ui/core';

import { NotFound } from '../NotFound/NotFound';
import { PostShort } from '../../features/PostShort/PostShort';

import styles from './MyPosts.module.scss';

const Component = ({className, posts, userStatus, userEmail, fetchPosts}) => {
 
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts] );

  return (
    <div className={clsx(className, styles.root)}>
    
      {userStatus === 'not-logged-in'
        ? <NotFound />
        : <>
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

          {
            posts
              .filter(post => post.email === userEmail)
              .sort((a, b) => (
                new Date(b.lastUpdate) - new Date(a.lastUpdate)
              ))
              .map(post => (
                <PostShort key={post._id} {...post} />
              ))
          }
        </>
      }
    </div>
  );
};
Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,

  fetchPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as MyPosts,
  Component as MyPostsComponent,
};
