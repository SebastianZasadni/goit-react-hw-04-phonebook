import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Filter = ({ handleFilter }) => {
  const inputFilterHandler = evt => {
    handleFilter(evt.target.value);
  };

  return <input type="text" name="filter" onChange={inputFilterHandler} />;
};

Filter.propTypes = {
  onFilter: PropTypes.func,
};
