const QueryInfo = () => {
  return [
    {
      description: ' Young people in Italy who are coding primarily as a hobby',
      columns:
      [
        { field: "DevType" , headerName: "Developer type", flex: 0.2 },
        { field: "Age" , headerName: "Age", flex: 0.2 },
        { field: "RemoteWork" , headerName: "Remote work", flex: 0.2, renderCell: (params) =>  `${params.value? "Yes" : "No"}`},
        { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
        { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
      ]
    },
    {
      description: 'Percentage of people with job satisfaction lower or equal than based on the country 5 out of 10 ',
      columns:
      [
        { field: "Country" , headerName: "Country", flex: 0.4 },
        { field: "Percentage" , headerName: "Percentage", flex: 0.6 },
      ]
    },
    {
     description: 'Number of developers that have a professional degree grouped by country',
     columns:
     [
       { field: "Country" , headerName: "Country", flex: 0.4 },
       { field: "Count" , headerName: "Count", flex: 0.6 },
     ]
   },
   {
    description: 'Learning resources are prefered by developers based on their education level',
    columns:
    [
      { field: "EdLevel" , headerName: "Education level", flex: 0.4 },
      { field: "PreferedResource" , headerName: "Preferred resource", flex: 0.6 },
    ]
  },
  {
   description: 'Annual salary for developers based on the education level',
   columns:
   [
     { field: "EdLevel" , headerName: "Education level", flex: 0.4},
     { field: "AverageSalary" , headerName: "Average salary", flex: 0.6 },
   ]
   },
   {
    description: 'Database used based on the organization size',
    columns:
    [
        { field: "OrgSize" , headerName: "Organization size", flex: 0.3 },
        { field: "MostUsedDatabase" , headerName: "Most used database", flex: 0.3 },
        { field: "Count" , headerName: "Count", flex: 0.4 },
    ]
  },
  {
   description: 'Most desired database based on the age group',
   columns:
   [
      { field: "Age" , headerName: "Age", flex: 0.2 },
      { field: "MostDesiredDatabase" , headerName: "Most desired database to work with", flex: 0.4},
      { field: "Count" , headerName: "Country", flex: 0.4 },
   ]
  },
  {
   description: 'Average years coding based on the developer type',
   columns:
   [
      { field: "DevType" , headerName: "Developer type", flex: 0.4 },
      { field: "AverageYearsCoding" , headerName: "Average years coding", flex: 0.6 },
   ]
  },
  {
   description: 'Employment status based on the country',
   columns:
   [
      { field: "Employment" , headerName: "Employment", flex: 0.4 },
      { field: "Country" , headerName: "Country", flex: 0.3 },
      { field: "Count", headerName: "Count", flex: 0.3}
   ]
  },
  {
   description: 'Average number of languages worked with and desired to work with based on developer type',
   columns:
   [
     { field: "DevType" , headerName: "Developer type", flex: 0.3 },
     { field: "AvgLanguagesWorkedWith" , headerName: "Average languages worked with", flex: 0.35 },
     { field: "AvgLanguagesDesiredToWorkWith" , headerName: "Average languages desired to work with", flex: 0.35 }
   ]
  },
 ]
}


export default QueryInfo;
