import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dataGridStyles from '../../styles/atoms/DataGrid.style';


const CDataGrid = (props) => {

  return (
    <div style={{ height: 450, width: '100%' }}>
      <DataGrid
        sx={dataGridStyles}
        autoPageSize={true}
        pageSizeOptions={[5, 10]}
        disableColumnMenu={true}
        {...props}
      />
    </div>

  );
};

export default CDataGrid;