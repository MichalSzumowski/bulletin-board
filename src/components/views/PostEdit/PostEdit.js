import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';
import { getAll, fetchPosts } from '../../../redux/postsRedux';

import { PostEditing } from '../../features/PostEditing/PostEditing';
import { NotFound } from '../NotFound/NotFound';

import styles from './PostEdit.module.scss';

const Component = ({ className, userStatus, userEmail, posts, fetchPosts, ...props }) => {

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts] );

  const properPost = posts.filter(post => post._id === props.match.params.id);
  
  console.log(posts, properPost);

  return (
    <div className={clsx(className, styles.root)}>
      
      {properPost.length > 0
        ? userStatus === 'not-logged-in' || (userStatus === 'logged-in' && userEmail !== properPost[0].email)
          ? <NotFound />
          : <PostEditing key={properPost[0]._id} {...properPost[0]} />
        : <NotFound />
      }
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,
  posts: PropTypes.array,
  match: PropTypes.object,

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
  Container as PostEdit,
  Component as PostEditComponent,
};
