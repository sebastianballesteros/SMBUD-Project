const url = (process.env?.REACT_APP_NODE_ENV === 'development')
                                  ? 'http://localhost:8080/'
                                  : 'https://smbud-project-19y6.onrender.com/'
export default url
