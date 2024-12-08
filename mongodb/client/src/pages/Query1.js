import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


import {Grid2 as Grid, Button} from '@mui/material';



import PageTitle from '../components/atoms/PageTitle.atom';



const Query1 = () => {
  return (
  <Grid width={'80%'} m="auto" sx={{py: 5}}>
    <PageTitle sx={{ m: 2 }}>Query 1</PageTitle>
  </Grid>
);
}

export default Query1;