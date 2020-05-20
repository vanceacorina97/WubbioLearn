import React from 'react';
import { TextField } from '@material-ui/core/'
import { InputAdornment } from '@material-ui/core/'

const CustomTextField = ({ handleChange, variant = 'outlined', inputClassName, endIcon, required = false, ...props }) => {
  return (<TextField
    required={required}
    variant={variant}
    size='small'
    margin='normal'
    color='secondary'
    onChange={handleChange}
    InputProps={
      {
        classes: {
          input: inputClassName,
        },
        endAdornment: (
          endIcon &&
          (<InputAdornment position="end">
            {endIcon}
          </InputAdornment>)
        ),
      }}
    {...props}
  />)
}

export default CustomTextField;