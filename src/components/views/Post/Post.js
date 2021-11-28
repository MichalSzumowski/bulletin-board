import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import { PostLong } from '../PostLong/PostLong';

const Component = ({ className, posts, ...props }) => (
  <div className={clsx(className, styles.root)}>
    {posts.map(post => (
      post.id !== props.match.params.id
        ? console.log(post.id, props.match.params.id)
        : <PostLong key={post.id} {...post} />
    ))}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
}; 