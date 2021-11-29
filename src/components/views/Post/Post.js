import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import { PostLong } from '../PostLong/PostLong';
import { NotFound } from '../NotFound/NotFound';

const Component = ({ className, posts, ...props }) => {
  
  const properPost = posts.filter(post => post.id === props.match.params.id);
  console.log(properPost);
  return (
    <div className={clsx(className, styles.root)}>
      {properPost.length > 0
        ? <PostLong key={properPost[0].id} {...properPost[0]} />
        : <NotFound />
      }
    </div>
  );
};

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