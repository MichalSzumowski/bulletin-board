import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './NotFound.module.scss';
import { Link } from '@material-ui/core';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <h1>There is nothing here, sorry :(</h1>
    <Link href="/">
      <h2>Back to homepage</h2>
    </Link>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as NotFound,
  Component as NotFoundComponent,
};
