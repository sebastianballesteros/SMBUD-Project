import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dataGridStyles from '../../styles/atoms/DataGrid.style';


const CDataGrid = (props) => {

  return (
    <div style={{ height: 430, width: '100%' }}>
      <DataGrid
        sx={dataGridStyles}
        autoPageSize={false}
        pageSizeOptions={[5, 10]}
        disableColumnMenu={true}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
          }
        }}
        {...props}
      />
    </div>

  );
};

export default CDataGrid;