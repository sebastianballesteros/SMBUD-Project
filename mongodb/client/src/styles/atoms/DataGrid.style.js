import theme from '../theme';


const DataGridStyle = {
  border: 0,
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader': {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-columnsContainer': {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
    '&:focus': {
      outline: 'none',
      backgroundColor: 'inherit',
    },
  },
  '& .MuiDataGrid-row': {
    marginTop: '12px' ,
    maxWidth: 'calc(100% - 2px)',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    backgroundColor: 'white',
  },
  '& .MuiDataGrid-renderingZone': {
    maxHeight: 'unset!important',
    overflowY: 'auto',
    overflowX: 'clip',
  },
};

export default DataGridStyle;