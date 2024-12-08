import React from 'react';

import TextField from "@mui/material/TextField";

const TLTextField = (props) => {

    return (
        <TextField variant='filled' {...props} {...(props.error && {error:true, helperText: props.error})} />
    );
    
};


export default TLTextField;