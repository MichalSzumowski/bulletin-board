import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSingle, fetchSinglePost } from '../../../redux/postsRedux';

import { NotFound } from '../NotFound/NotFound';
import { PostLong } from '../../features/PostLong/PostLong';

import styles from './Post.module.scss';

const Component = ({className, post, fetchSinglePost, ...props}) => {

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
  className: PropTypes.string,
  post: PropTypes.object,
  fetchSinglePost: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
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
