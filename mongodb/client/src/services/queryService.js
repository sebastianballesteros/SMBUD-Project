import axios from 'axios';

import url from '../config';

export async function getQuery (queryId, setValues) {
  await axios.get(`${url}query${queryId}`)
  .then(response => {
    let dataParse = response.data.results.map((row) => {
      return {...row, id: row._id ? row._id : "Unknown"}
    })
   console.log(dataParse)
    setValues(dataParse)
  setValues(dataParse)
  }).catch(error => {
    /*setNotify({
      isOpen: true,
      message: error.response.data.message,
      type: 'error'
    });*/
    console.log(error)
    alert(error)
  });
}