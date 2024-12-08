const ColumnsQuery1 = () => [
  { field: "DevType" , headerName: "Developer type", flex: 0.3 },
  { field: "Age" , headerName: "Age", flex: 0.2 },
  { field: "RemoteWork" , headerName: "RemoteWork", flex: 0.2 },
  { field: "YearsCode" , headerName: "Years coding", flex: 0.2 },
  { field: "Country" , headerName: "Country", flex: 0.2 }, //, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
]

export default ColumnsQuery1;