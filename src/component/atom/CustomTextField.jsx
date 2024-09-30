import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ onChange, value, ...props }) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      value={value}
      onChange={onChange}
      {...props} // Spread any other props to maintain flexibility
      sx={{
        '& .MuiOutlinedInput-root': {
          padding: '2px', // Custom padding
          '& input': {
            padding: '0px 10px', // Inner input padding
          },
        },
      }}
    />
  );
};

export default CustomTextField;
