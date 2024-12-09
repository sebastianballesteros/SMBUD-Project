import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Grid2 as Grid, Box, Card, CardContent, Typography } from '@mui/material';

import CButton from '../components/atoms/CButton.atom';
import CPageTitle from '../components/atoms/CPageTitle.atom';
import QueryInfo from '../constants/QueryInfo.constant';

const Home = () => {

  const navigate = useNavigate();

  const handleQueryClick = (queryNumber) => {
    navigate(`/query/${queryNumber}`);
  }

  return (
    <Grid width={'80%'} m="auto" sx={{py: 5}}>
      <CPageTitle sx={{ m: 2 }}>Queries</CPageTitle>

      <Grid container spacing={4} style={{marginTop: '10px'}}>
        {Array.from({ length: 10 }, (_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
          <Box sx={{ width: 255 }}>
            <Card variant="outlined" style={{height: 200}}>
            <CardContent>
              <Typography variant="h5" component="div">
                Query {index + 1}
              </Typography>
              <Typography style={{marginTop: '4px'}} variant="body2">
                {QueryInfo()[index]?.description}
              </Typography>
            </CardContent>
            <CButton
              style={{margin: '10px'}}
              size="large"
              variant="contained"
              onClick={() => handleQueryClick(index + 1)}
              label={`Query ${index + 1}`}/>
           </Card>
          </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );

};

export default Home;
