import React from 'react';
import { TextField } from '@material-ui/core';

const TextBox = ({ input, label, meta : { touched, error }, type }) => {
  return (
    <TextField
      { ... {
        label,
        type,
        ...input,
        error      : !!(touched && error),
        margin     : 'dense',
        helperText : touched && error ? error : ' ',
      } }
    />
  );
}

export default TextBox
