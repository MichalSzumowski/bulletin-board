import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';

import { PostEditing } from '../../features/PostEditing/PostEditing';
import { NotFound } from '../NotFound/NotFound';

import styles from './PostEdit.module.scss';

const Component = ({ className, userStatus, userEmail, posts, ...props }) => {

  const properPost = posts.filter(post => post._id === props.match.params.id);

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
};

const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
