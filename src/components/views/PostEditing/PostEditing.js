import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { editPost } from '../../../redux/postsRedux';

import styles from './PostEditing.module.scss';

import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { currentDate } from '../../../utils/utils';
import { useHistory } from 'react-router-dom';

// {className, userStatus, userEmail, posts, ...props}
const Component = ({ className, editPost, id, title, text, status, price, phone, location, created, updated, image, imageName }) => { 
  
  const [editedPost, setEditedPost] = useState({
    id: id,
    title: title,
    text: text,
    price: price,
    phone: phone,
    location: location,
    status: status,
    image: '',
    imageName: imageName,
    created: created,
    updated: updated,
  });

  const handleEditedPost = event => {
    if (event.target.name === 'image') {
      const image = event.target.files[0];
      setEditedPost({
        ...editedPost,
        image: event.target.value,
        imageName: image.name,
      });
    } else {
      setEditedPost({
        ...editedPost,
        [event.target.name]: event.target.value,
      });
    }
  };

  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    
    editPost({
      ...editedPost,
      updated: currentDate(),
    });
    alert('Post successfully updated!');
    history.push('/');
  };

  return ( 
    <div className={clsx(className, styles.root)}>
      <h1>Edit Your Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          id='post-title'
          className={styles.formInput}
          label='Title'
          variant='outlined'
          required
          inputProps={{
            minLength: 10,
            maxLength: 30,
          }}
          value={editedPost.title}
          onChange={handleEditedPost}
          name='title'
        />
        <TextField
          id='post-description'
          className={styles.formInput}
          label='Description'
          variant='outlined'
          required
          multiline
          inputProps={{
            minLength: 20,
            maxLength: 5000,
          }}
          value={editedPost.text}
          onChange={handleEditedPost}
          name='text'
        />
        <TextField
          id='post-price'
          className={styles.formInput}
          variant='outlined'
          type='number'
          label='Price'
          required
          inputProps={{
            min: 1,
            max: 999999,
          }}
          value={editedPost.price}
          onChange={handleEditedPost}
          name='price'
        />
        <TextField
          id='post-phone'
          type='tel'
          className={styles.formInput}
          label='Phone'
          variant='outlined'
          inputProps={{
            minLength: 9,
            maxLength: 20,
          }}
          value={editedPost.phone}
          onChange={handleEditedPost}
          name='phone'
        />
        <TextField
          id='post-location'
          className={styles.formInput}
          label='Location'
          variant='outlined'
          inputProps={{
            minLength: 3,
            maxLength: 30,
          }}
          value={editedPost.location}
          onChange={handleEditedPost}
          name='location'
        />

        <FormControl variant='outlined' className={styles.formInput} required>
          <InputLabel id='post-status-label'>Status</InputLabel>
          <Select
            labelId='post-status-label'
            id='post-status'
            label='Status'
            value={editedPost.status}
            onChange={handleEditedPost}
            name='status'
          >
            <MenuItem value={'draft'}>Draft</MenuItem>
            <MenuItem value={'published'}>Published</MenuItem>
            <MenuItem value={'closed'}>Closed</MenuItem>
          </Select>
        </FormControl>

        <label htmlFor='post-image'>
          <Button className={styles.formInput + ' ' + styles.formUpload} variant='outlined' component='span'>
            <input
              accept='image/*'
              id='post-image'
              type='file'
              hidden
              fullWidth
              value={editedPost.image}
              onChange={handleEditedPost}
              name='image'
            />
            {editedPost.image.length > 0 ? `Uploaded: ${editedPost.imageName}` : 'Upload image'}
          </Button>
        </label>

        <Button
          className={styles.formInput + ' ' + styles.formSubmit}
          type='submit'
          variant='outlined'
          fullWidth
        >
        Add edited Post
        </Button>
      </form>
    </div>
  ); 
};

Component.propTypes = {
  className: PropTypes.string,
  editPost: PropTypes.func,

  id: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  phone: PropTypes.number,
  location: PropTypes.string,
  imageName: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
};
  
// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });
  
const mapDispatchToProps = dispatch => ({
  editPost: editedPost => dispatch(editPost(editedPost)),
});

const Container = connect(null, mapDispatchToProps)(Component);
  
export {
  Container as PostEditing,
  Component as PostEditingComponent,
};