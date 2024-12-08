import React , { useState, useEffect } from 'react';

import {Grid2 as Grid} from '@mui/material';


import * as queryService from '../services/queryService'
import ColumnsQuery1 from '../constants/ColumnsQuery1.constant';

import CPageTitle from '../components/atoms/CPageTitle.atom';
import CDataGrid from '../components/atoms/CDataGrid.atom';


const Query1 = () => {

  const [records, setRecords] = useState(null);

  useEffect(() => {
    queryService.getQuery(1, setRecords);
    
  }, [])

  return (
  <Grid width={'80%'} m="auto" sx={{py: 5}}>
    <CPageTitle sx={{ m: 2 }}>Query 1</CPageTitle>

    <Grid xs={12} sx={{pt: 3}}>
      <CDataGrid 
        rows={records ? records: []}
        columns={ColumnsQuery1()}
        disableSelectionOnClick
        />
    </Grid>

  </Grid>
);
}

export default Query1;