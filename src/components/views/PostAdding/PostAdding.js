import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserEmail } from '../../../redux/userRedux';
import { addNewPost } from '../../../redux/postsRedux';

import styles from './PostAdding.module.scss';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { currentDate, randomId } from '../../../utils/utils';

import { useHistory } from 'react-router-dom';


const Component = ({className, userEmail, addPost }) => {

  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    price: '',
    phone: '',
    location: '',
    status: 'draft',
    image: '',
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
      
    if (!newPost.title || !newPost.text || !newPost.status) {
      alert('Please fill all required fields.');
    } else if (newPost.title.length < 10) {
      alert('Your title is too short!');
    } else if (newPost.text.length < 20) {
      alert('Your description is too short!');
    } else {
      const date = new Date(Date.now());
      addPost({
        ...newPost,
        email: userEmail,
        created: currentDate(date),
        updated: currentDate(date),
      });
      setNewPost({
        title: '',
        text: '',
        price: '',
        phone: '',
        location: '',
        status: 'draft',
        image: '',
        imageName: '',
      });
      alert('Post added successfully!');
      history.push('/');
      console.log(newPost);
    }
  };
  
  return (
    <div className={clsx(className, styles.root)}>
      <h1>New Post</h1>

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
          name='title'
          value={newPost.title}
          onChange={handleNewPost}
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
          name='text'
          value={newPost.text}
          onChange={handleNewPost}
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
          name='price'
          value={newPost.price}
          onChange={handleNewPost}
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
          name='phone'
          value={newPost.phone}
          onChange={handleNewPost}
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
          name='location'
          value={newPost.location}
          onChange={handleNewPost}
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
              value={newPost.image}
              onChange={handleNewPost}
              hidden
            />
            {newPost.image.length > 0 ? `Uploaded: ${newPost.imageName}` : 'Upload image'}
          </Button>
        </label>
  
        <Button
          className={styles.formInput + ' ' + styles.formSubmit}
          type='submit'
          variant='outlined'
          size='large'
          fullWidth
        >
              Add new Post
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