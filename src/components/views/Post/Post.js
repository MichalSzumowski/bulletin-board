import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSingle, fetchSinglePost } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import { PostLong } from '../PostLong/PostLong';
import { NotFound } from '../NotFound/NotFound';

const Component = ({ className, post, fetchSinglePost, ...props }) => {
  
  useEffect(() => {
    fetchSinglePost(props.match.params.id);
  }, [props.match.params.id, fetchSinglePost] );

  return (
    <div className={clsx(className, styles.root)}>
      {post 
        ? <PostLong key={post._id} {...post} />
        : <NotFound />
      }
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  match: PropTypes.object,
  fetchSinglePost: PropTypes.func,
};

const mapStateToProps = state => ({
  post: getSingle(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSinglePost: id => dispatch(fetchSinglePost(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
}; 