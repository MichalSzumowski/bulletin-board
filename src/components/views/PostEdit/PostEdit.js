import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';
import { getAll } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';
import { NotFound } from '../NotFound/NotFound';
import { PostEditing } from '../PostEditing/PostEditing';


const Component = ({className, userStatus, userEmail, posts, ...props}) => {
  
  const properPost = posts.filter(post => post.id === props.match.params.id);
  
  return (
    <div className={clsx(className, styles.root)}>
      {properPost.length > 0 
        && userStatus === 'admin'
        || (userStatus === 'logged-in' && userEmail === properPost[0].email)
        ? <PostEditing key={properPost[0].id} {...properPost[0]} />
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
  userStatus: getUserStatus(state),
  posts: getAll(state),
  userEmail: getUserEmail(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
