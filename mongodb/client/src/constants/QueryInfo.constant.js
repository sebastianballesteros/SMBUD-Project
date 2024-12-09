const QueryInfo = () => {
  return [
    {
      description: ' Young people in Italy who are coding primarily as a hobby',
      columns:
      [
        { field: "DevType" , headerName: "Developer type", flex: 0.3 },
        { field: "Age" , headerName: "Age", flex: 0.2 },
        { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
        { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
        { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
      ]
    },
    {
      description: 'People learning to code in the USA that work remotely and have a low job satisfacion',
      columns:
      [
        { field: "MainBranch" , headerName: "Developer type", flex: 0.3 },
        { field: "JobSat" , headerName: "Job satisfacion", flex: 0.2 },
        { field: "Age" , headerName: "Age", flex: 0.2 },
        { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
        { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
        { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
      ]
    },
    {
     description: 'Number of developers that have a professional degree grouped by country',
     columns:
     [
       { field: "id" , headerName: "Country", flex: 0.3 },
       { field: "count" , headerName: "Count", flex: 0.2 },
     ]
   },
   {
    description: 'Learning resources are prefered by developers based on their education level',
    columns:
    [
      { field: "DevType" , headerName: "Developer type", flex: 0.3 },
      { field: "Age" , headerName: "Age", flex: 0.2 },
      { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
      { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
      { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
    ]
  },
  {
   description: 'Annual salary for developers based on the education level',
   columns:
   [
     { field: "DevType" , headerName: "Developer type", flex: 0.3 },
     { field: "Age" , headerName: "Age", flex: 0.2 },
     { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
     { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
     { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
   ]
   },
   {
    description: 'Database used based on the organization size',
    columns:
    [
      { field: "DevType" , headerName: "Developer type", flex: 0.3 },
      { field: "Age" , headerName: "Age", flex: 0.2 },
      { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
      { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
      { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
    ]
  },
  {
   description: 'Description of query 7',
   columns:
   [
     { field: "DevType" , headerName: "Developer type", flex: 0.3 },
     { field: "Age" , headerName: "Age", flex: 0.2 },
     { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
     { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
     { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
   ]
  },
  {
   description: 'Description of query 8',
   columns:
   [
     { field: "DevType" , headerName: "Developer type", flex: 0.3 },
     { field: "Age" , headerName: "Age", flex: 0.2 },
     { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
     { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
     { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
   ]
  },
  {
   description: 'Description of query 9',
   columns:
   [
     { field: "DevType" , headerName: "Developer type", flex: 0.3 },
     { field: "Age" , headerName: "Age", flex: 0.2 },
     { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
     { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
     { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
   ]
  },
  {
   description: 'Description of query 10',
   columns:
   [
     { field: "DevType" , headerName: "Developer type", flex: 0.3 },
     { field: "Age" , headerName: "Age", flex: 0.2 },
     { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
     { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
     { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
   ]
  },
 ]
}


export default QueryInfo;
