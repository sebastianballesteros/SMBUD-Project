import React , { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import {Grid2 as Grid, Button, Typography, ToggleButton, ToggleButtonGroup} from '@mui/material';

import { JsonEditor } from 'json-edit-react'

import * as queryService from '../services/queryService'
import QueryInfo from '../constants/QueryInfo.constant';

import CPageTitle from '../components/atoms/CPageTitle.atom';
import CDataGrid from '../components/atoms/CDataGrid.atom';


const Query = () => {

  const { queryNumber } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState(null);
  const [toggleValue, setToggleValue] = useState('table');

  const handleBackClick = (queryNumber) => {
    navigate(`/query`);
  }

  const handleToggleChange = (event, toggleChange) => {
    if (toggleChange) {
      setToggleValue(toggleChange);
    }
  }

  useEffect(() => {
    queryService.getQuery(queryNumber, setRecords);

  }, [queryNumber])

  return (
  <>
    <Grid width={'80%'} m="auto" sx={{py: 5}}>
      <CPageTitle sx={{ m: 2 }}>Query {queryNumber}</CPageTitle>
      <Typography style={{marginTop: '4px'}} variant="h5">
        {QueryInfo()[queryNumber-1]?.description}
      </Typography>

      <ToggleButtonGroup
        color="primary"
        value={toggleValue}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
        style={{ marginTop: '15px', marginBottom: '15px'}}
      >
        <ToggleButton value="table">Table</ToggleButton>
        <ToggleButton value="json">JSON file</ToggleButton>
      </ToggleButtonGroup>

      { toggleValue === 'table' &&

        <Grid xs={12} sx={{pt: 3}}>
          <CDataGrid
            rows={records ? records: []}
            columns={QueryInfo()[queryNumber-1].columns}
            disableSelectionOnClick
            />
        </Grid>
      }
      { toggleValue === 'json' &&

        <JsonEditor
          data={ records }
          collapse={1}
        />
      }
    </Grid>
    <Button
      style={{marginTop: '-50px', marginLeft: '150px'}}
      variant="contained"
      onClick={() => handleBackClick()}>
      Back
    </Button>
  </>
);
}

export default Query;
