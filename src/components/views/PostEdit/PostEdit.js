import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';
import { getAll } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';
import { NotFound } from '../NotFound/NotFound';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';


const Component = ({className, userStatus, userEmail, posts}) => {

  const [status, setStatus] = useState('');
  const handleStatus = event => {
    setStatus(event.target.value);
  };

  const [image, setImage] = useState(null);
  const handleImage = ({ target }) => {
    setImage(target.files[0]);
  };
  
  return (
    <div className={clsx(className, styles.root)}>
      {userStatus === 'not-logged-in' || userEmail !== post.email
        ? <NotFound />
        :         
        <>
          <h1>Edit Your Post</h1>
          <form className={styles.form}>
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
            />
            <TextField
              id='post-email'
              className={styles.formInput}
              label='E-mail'
              variant='outlined'
              type='email'
              required
              inputProps={{
                minLength: 6,
                maxLength: 100,
              }}
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
            />

            <FormControl variant='outlined' className={styles.formInput} required>
              <InputLabel id='post-status-label'>Status</InputLabel>
              <Select
                labelId='post-status-label'
                id='post-status'
                value={status}
                onChange={handleStatus}
                label='Status'
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
                  onChange={handleImage}
                  hidden
                  fullWidth
                />
                {image ? `Uploaded: ${image.name}` : 'Upload image'}
              </Button>
            </label>

            <Button
              className={styles.formInput + ' ' + styles.formSubmit}
              type='submit'
              variant='outlined'
              size='large'
              fullWidth
            >
            Add edited Post
            </Button>
          </form>
        </>
      };
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.string,
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
