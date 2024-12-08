import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Grid2 as Grid} from '@mui/material';

import Button from '../components/atoms/Button.atom';
import PageTitle from '../components/atoms/PageTitle.atom';

const Home = () => {

  const navigate = useNavigate();

  const handleQueryClick = (queryNumber) => {
    navigate(`/query${queryNumber}`);
  }

  return (
    <Grid width={'80%'} m="auto" sx={{py: 5}}>
      <PageTitle sx={{ m: 2 }}>Queries</PageTitle>
    
      <Grid container spacing={2}>
        {Array.from({ length: 10 }, (_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button variant="contained" fullWidth onClick={() => handleQueryClick(index + 1)} label={`Query ${index + 1}`}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );

};

export default Home;