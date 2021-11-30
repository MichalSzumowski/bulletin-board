import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addNewPost } from '../../../redux/postsRedux';
import { getUserEmail } from '../../../redux/userRedux';

import { TextField, FormControl, InputLabel, Select, MenuItem, Button, OutlinedInput, InputAdornment } from '@material-ui/core';

import { currentDate } from '../../../utils/CurrentDate';

import styles from './PostAdding.module.scss';

const Component = ({ className, userEmail, addPost }) => {

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    status: 'draft',
    image: '',
    price: '',
    phone: '',
    city: '',
    imageName: '',
  });

  const handleNewPost = event => {
    if(event.target.name === 'image') {
      const image = event.target.files[0];
      setNewPost({
        ...newPost,
        image: image,
        imageName: image.name,
      });
    } else {
      setNewPost({
        ...newPost,
        [event.target.name]: event.target.value,
      });
    }
  };

  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    if(!newPost.title || !newPost.content || !newPost.status) {
      alert('Please fill all of the necessary fields!');
    } else if(newPost.title.length < 10) {
      alert('Your title is too short!');
    } else if(newPost.content.length < 20) {
      alert('Your description is too short!');
    } else {
      const date = new Date(Date.now());
      addPost({
        ...newPost,
        email: userEmail,
        date: currentDate(date),
        lastUpdate: currentDate(date),
      });
      setNewPost({
        title: '',
        content: '',
        status: 'draft',
        image: '',
        price: '',
        phone: '',
        city: '',
        imageName: '',
      });
      alert('Post successfully added!');
      history.push('/');
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      <h1>Adding new post</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          id='post-title'
          name='title'
          className={styles.formInput}
          label='Title'
          variant='outlined'
          value={newPost.title}
          onChange={handleNewPost}
          required
          inputProps={{
            minLength: 10,
            maxLength: 30,
          }}
        />
        <TextField
          id='post-description'
          name='content'
          className={styles.formInput}
          label='Description'
          variant='outlined'
          value={newPost.content}
          onChange={handleNewPost}
          multiline
          rows='10'
          required
          inputProps={{
            minLength: 20,
            maxLength: 5000,
          }}
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
            max: 999999999,
          }}
          name='price'
          value={newPost.price}
          onChange={handleNewPost}
        />
        <TextField
          id='post-phone'
          type='number'
          name='phone'
          className={styles.formInput}
          label='Phone'
          variant='outlined'
          value={newPost.phone}
          onChange={handleNewPost}
          inputProps={{
            minLength: 9,
            maxLength: 20,
          }}
        />
        <TextField
          id='post-location'
          name='city'
          className={styles.formInput}
          label='Location'
          variant='outlined'
          value={newPost.city}
          onChange={handleNewPost}
          inputProps={{
            minLength: 3,
            maxLength: 30,
          }}
        />

        <FormControl variant='outlined' className={styles.formInput} required>
          <InputLabel id='post-status-label'>Status</InputLabel>
          <Select
            labelId='post-status-label'
            id='post-status'
            name='status'
            value={newPost.status}
            onChange={handleNewPost}
            label='Status'
          >
            <MenuItem value={'draft'}>Draft</MenuItem>
            <MenuItem value={'published'}>Published</MenuItem>
            <MenuItem value={'closed'}>Closed</MenuItem>
          </Select>
        </FormControl>

        <label htmlFor='post-image'>
          <Button className={styles.formInput + ' ' + styles.formButton} variant='outlined' component='span'>
            <input
              accept='image/*'
              id='post-image'
              name='image'
              type='file'
              onChange={handleNewPost}
              hidden
            />
            {newPost.image ? `Uploaded: ${newPost.imageName}` : 'Upload image'}
          </Button>
          <img id='image-preview' className={styles.imagePreview} src='' alt='' />
        </label>

        <Button
          className={styles.formInput + ' ' + styles.formSubmit}
          type='submit'
          variant='outlined'
          size='large'
        >
          Publish!
        </Button>
      </form>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  userEmail: PropTypes.string,
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: newPost => dispatch(addNewPost(newPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdding,
  Component as PostAddingComponent,
};
