import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPosts } from '../../../redux/postsRedux';
import { getUserStatus } from '../../../redux/userRedux';

import { Button, Link } from '@material-ui/core';

import { PostShort } from '../../features/PostShort/PostShort';

import styles from './Homepage.module.scss';

const Component = ({ className, posts, userStatus, fetchPosts }) => {

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts] );

  console.log(posts);

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.header}>
        <h1>Latest posts</h1>

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

      {posts
        .sort((a, b) => (
          new Date(b.lastUpdate) - new Date(a.lastUpdate)
        ))
        .map(post => (
          <PostShort key={post._id} {...post} />
        ))
      }
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  userStatus: PropTypes.string,
  fetchPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
