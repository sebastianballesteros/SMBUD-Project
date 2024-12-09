import React from 'react';

import Button from '@mui/material/Button';

const CButton = (props) => {

  return (
    <Button {...props}>{props.label}</Button>
  );
  
};


export default CButton;