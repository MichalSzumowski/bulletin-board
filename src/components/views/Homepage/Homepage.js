import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getUserStatus } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';
import { PostShort } from '../PostShort/PostShort';
import { Button, Link } from '@material-ui/core';


const Component = ({ className, posts, userStatus }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.header}>
      <h1>Announcements</h1>
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
    
    {posts.map(post => (
      <PostShort key={post.id} {...post} />
    ))}
  </div>
);

Component.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
  userStatus: PropTypes.string,
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
